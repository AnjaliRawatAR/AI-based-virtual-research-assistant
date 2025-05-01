const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const natural = require('natural');
const { removeStopwords } = require('stopword');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Ensure upload directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
console.log('Highlight routes mounted at /api/highlights');

// Helper functions
function preprocessText(text) {
  const tokenizer = new natural.SentenceTokenizer();
  const sentences = tokenizer.tokenize(text);

  return sentences.map(sentence => {
    const noPunct = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    const words = noPunct.split(/\s+/);
    const filteredWords = removeStopwords(words);
    return filteredWords.join(' ');
  });
}

function extractHighlights(text, numHighlights = 5) {
  const tokenizer = new natural.SentenceTokenizer();
  const sentences = tokenizer.tokenize(text);
  const totalSentences = sentences.length;

  const tfidf = new natural.TfIdf();
  sentences.forEach(sentence => {
    const processed = sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    tfidf.addDocument(processed);
  });

  const sentenceScores = sentences.map((sentence, i) => {
    let tfidfScore = 0;
    const terms = sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);

    terms.forEach(term => {
      tfidf.tfidfs(term, (j, measure) => {
        if (j === i) tfidfScore += measure;
      });
    });

    const positionWeight = (i === 0 || i === totalSentences - 1) ? 1.5 : 1;
    const wordCount = terms.length;
    const lengthWeight = (wordCount > 5 && wordCount < 25) ? 1.2 : 1;

    return {
      sentence,
      score: tfidfScore * positionWeight * lengthWeight
    };
  });

  const sortedSentences = sentenceScores.sort((a, b) => b.score - a.score);
  return sortedSentences.slice(0, numHighlights).map(item => item.sentence).join('\n\n');
}

// API Endpoint for text-based highlights
router.post('/extract-key-highlights', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({
        error: 'Text is too short for processing.',
        highlights: ''
      });
    }

    const highlights = extractHighlights(text);
    res.json({ highlights });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ error: 'Failed to process text.' });
  }
});

// API Endpoint for PDF extraction
router.post('/extract-key-highlights-pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);

    fs.unlinkSync(req.file.path);

    if (!data.text || data.text.trim().length < 10) {
      return res.status(400).json({
        error: 'PDF text extraction failed. The PDF may be scanned or image-based.',
        extractedText: ''
      });
    }

    const highlights = extractHighlights(data.text);
    res.json({
      highlights,
      extractedText: data.text
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({
      error: 'Failed to process PDF. Please ensure it is a valid text-based PDF.',
      extractedText: ''
    });
  }
});

module.exports = router;