const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { checkPlagiarism } = require('../controllers/plagiarismController');

router.post('/check-plagiarism', upload.single('file'), checkPlagiarism);

module.exports = router;
