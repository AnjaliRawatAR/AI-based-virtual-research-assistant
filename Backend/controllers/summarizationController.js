// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const axios = require('axios');
// const { GoogleAuth } = require('google-auth-library');

// const auth = new GoogleAuth({
//   keyFile: './google-service-account.json', // path to your downloaded key
//   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
// });

// // ✅ Extract PDF text
// exports.extractPdfText = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: 'No file uploaded' });

//     const dataBuffer = fs.readFileSync(file.path);
//     const data = await pdfParse(dataBuffer);
//     res.json({ extractedText: data.text });
//   } catch (err) {
//     console.error('❌ PDF Extraction Error:', err);
//     res.status(500).json({ error: 'Failed to extract PDF text' });
//   }
// };

// // ✅ Summarize using Gemini Flash (OAuth token)
// exports.summarizeText = async (req, res) => {
//   const { text } = req.body;

//   if (!text || text.trim().length === 0) {
//     return res.status(400).json({ error: 'Text is required' });
//   }

//   try {
//     const client = await auth.getClient();
//     const accessToken = await client.getAccessToken();

//     const prompt = `Summarize the following text:\n\n${text}`;

//     const response = await axios.post(
//       'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
//       {
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text: prompt }]
//           }
//         ]
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken.token}`,
//         }
//       }
//     );

//     const summary = response.data.candidates[0].content.parts[0].text;
//     res.json({ summary });
//   } catch (err) {
//     console.error('❌ Gemini Flash OAuth Error:', err.response?.data || err.message);
//     res.status(500).json({ error: 'Failed to summarize text' });
//   }
// };

const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('🔐 API Key loaded:', process.env.GEMINI_API_KEY);


exports.extractPdfText = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      console.log('❌ No file received in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);

    console.log('✅ PDF text extracted successfully');
    res.json({ extractedText: data.text });
  } catch (err) {
    console.error('❌ Error during PDF extraction:', err);
    res.status(500).json({ error: 'Failed to extract PDF text' });
  }
};

exports.summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      console.log('❌ Empty or missing text');
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('📩 Text received (first 200 chars):', text.slice(0, 200));

    // ✅ Use the correct name for v1beta: just 'gemini-pro'
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // ✅ Must pass array of strings
    const result = await model.generateContent([`Summarize the following:\n${text}`]);
    const response = await result.response;
    const summary = response.text();

    console.log('✅ Summary generated:\n', summary);
    res.json({ summary });

  } catch (err) {
    console.error('❌ Error during Gemini summarization:\n', err);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
};

