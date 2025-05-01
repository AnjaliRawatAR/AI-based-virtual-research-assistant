const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Extract text from PDF
exports.extractPdfText = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);

    console.log('✅ PDF text extracted');
    res.json({ extractedText: data.text });
  } catch (err) {
    console.error('❌ PDF extraction error:', err);
    res.status(500).json({ error: 'Failed to extract PDF text' });
  }
};

// ✅ Summarize text using Gemini SDK (v1beta)
exports.summarizeText = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text is required for summarization' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // ✅ correct name for SDK

    const result = await model.generateContent([
      `Summarize the following:\n${text}`
    ]);

    const response = await result.response;
    const summary = response.text();

    console.log('✅ Summary generated:', summary);
    res.json({ summary });
  } catch (err) {
    console.error('❌ Gemini SDK error:', err);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
};

// const pdfParse = require('pdf-parse');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const fs = require('fs');

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log('🔐 API Key loaded:', process.env.GEMINI_API_KEY);


// exports.extractPdfText = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       console.log('❌ No file received in request');
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const dataBuffer = fs.readFileSync(file.path);
//     const data = await pdfParse(dataBuffer);

//     console.log('✅ PDF text extracted successfully');
//     res.json({ extractedText: data.text });
//   } catch (err) {
//     console.error('❌ Error during PDF extraction:', err);
//     res.status(500).json({ error: 'Failed to extract PDF text' });
//   }
// };

// exports.summarizeText = async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text || text.trim().length === 0) {
//       console.log('❌ Empty or missing text');
//       return res.status(400).json({ error: 'Text is required' });
//     }

//     console.log('📩 Text received (first 200 chars):', text.slice(0, 200));

//     // ✅ Use the correct name for v1beta: just 'gemini-pro'
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     // ✅ Must pass array of strings
//     const result = await model.generateContent([`Summarize the following:\n${text}`]);
//     const response = await result.response;
//     const summary = response.text();

//     console.log('✅ Summary generated:\n', summary);
//     res.json({ summary });

//   } catch (err) {
//     console.error('❌ Error during Gemini summarization:\n', err);
//     res.status(500).json({ error: 'Failed to summarize text' });
//   }
// };

