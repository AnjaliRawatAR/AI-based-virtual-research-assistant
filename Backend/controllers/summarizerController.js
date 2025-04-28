const axios = require('axios');
const pdfParse = require('pdf-parse');

// Summarize plain text using Gemini
exports.summarizeText = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: `Summarize the following:\n\n${text}` }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        }
      }
    );

    const summary = response.data.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (err) {
    console.error('Gemini summarization error:', err.message);
    res.status(500).json({ error: 'Failed to summarize' });
  }
};

// Extract text from uploaded PDF
exports.extractPdfText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF uploaded' });
    }

    const data = await pdfParse(req.file.buffer);
    res.json({ extractedText: data.text });
  } catch (err) {
    console.error('PDF extraction error:', err.message);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  }
};
/*
const axios = require('axios');

exports.summarizeWithGemini = async (text) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: `Summarize the following:\n\n${text}` }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    throw new Error('Gemini summarization failed');
  }
};

*/