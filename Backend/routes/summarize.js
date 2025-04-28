const express = require('express');
const multer = require('multer');
const { summarizeText, extractPdfText } = require('../controllers/summarizerController');

const router = express.Router();
const upload = multer(); // in-memory storage for PDFs

// For summarizing raw text
router.post('/summarize', summarizeText);

// For extracting text from PDF
router.post('/extract-pdf-text', upload.single('file'), extractPdfText);

module.exports = router;

/*
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { summarizeWithGemini } = require('../controllers/summarizerController');

const router = express.Router();
const upload = multer(); // memory storage

router.post('/summarize-pdf', upload.single('file'), async (req, res) => {
  try {
    const pdfData = await pdfParse(req.file.buffer);
    const summary = await summarizeWithGemini(pdfData.text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize PDF' });
  }
});

module.exports = router;

*/ 