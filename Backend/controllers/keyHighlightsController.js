const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractKeyHighlights = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const response = await axios.post('http://localhost:5001/extract', { text });
    const highlights = response.data.highlights;
    console.log('Extracted Highlights:', highlights);
    res.json({ highlights: highlights.join('\n\n') });
  } catch (err) {
    console.error('ML Model Error:', err);
    res.status(500).json({ error: 'Failed to extract highlights using model.' });
  }
};

const extractTextFromPdf = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    fs.unlinkSync(req.file.path); // Clean up
    res.json({ extractedText: data.text });
  } catch (err) {
    console.error('PDF Parsing Error:', err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
};

module.exports = { extractKeyHighlights, extractTextFromPdf };


// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const natural = require('natural');
// const { removeStopwords } = require('stopword');

// // Core highlight logic
// const extractHighlights = (text, max = 5) => {
//   const tokenizer = new natural.SentenceTokenizer();
//   const sentences = tokenizer.tokenize(text);

//   const tfidf = new natural.TfIdf();
//   sentences.forEach((s) => tfidf.addDocument(s));

//   const scores = sentences.map((s, idx) => {
//     const words = removeStopwords(s.split(/\s+/));
//     let score = 0;
//     words.forEach((w) => {
//       tfidf.tfidfs(w, (i, val) => {
//         if (i === idx) score += val;
//       });
//     });
//     return { sentence: s, score };
//   });

//   return scores
//     .sort((a, b) => b.score - a.score)
//     .slice(0, max)
//     .map((s) => s.sentence)
//     .join('\n\n');
// };

// // Text input route
// exports.extractKeyHighlights = (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text || text.trim().length < 10) {
//       return res.status(400).json({ error: 'Text is too short.', highlights: '' });
//     }

//     const highlights = extractHighlights(text);
//     res.json({ highlights });
//   } catch (err) {
//     console.error('❌ Error in text highlight:', err);
//     res.status(500).json({ error: 'Server error during highlight extraction.' });
//   }
// };

// // PDF upload route
// exports.extractHighlightsFromPdf = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No PDF uploaded.' });

//     const buffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdfParse(buffer);
//     fs.unlinkSync(req.file.path); // cleanup temp file

//     const text = pdfData.text;
//     if (!text || text.trim().length < 10) {
//       return res.status(400).json({ error: 'Extracted PDF text is too short.' });
//     }

//     const highlights = extractHighlights(text);
//     res.json({ extractedText: text, highlights });
//   } catch (err) {
//     console.error('❌ Error in PDF highlight:', err);
//     res.status(500).json({ error: 'Error extracting PDF highlights.' });
//   }
// };
