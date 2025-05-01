const fs = require('fs');
const pdfParse = require('pdf-parse');
const { compareTextChunks } = require('../utils/compareChunks');

exports.checkPlagiarism = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;
    const plagiarismPercentage = await compareTextChunks(text);

    res.json({ percentage: plagiarismPercentage });
  } catch (err) {
    console.error('❌ Plagiarism check failed:', err);
    res.status(500).json({ error: 'Failed to check plagiarism' });
  }
};
