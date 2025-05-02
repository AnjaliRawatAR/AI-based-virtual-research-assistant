const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractKeyHighlights, extractTextFromPdf } = require('../controllers/keyHighlightsController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/extract-key-highlights', extractKeyHighlights);
router.post('/extract-key-highlights-pdf', upload.single('file'), extractTextFromPdf);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const {
//   extractKeyHighlights,
//   extractHighlightsFromPdf,
// } = require('../controllers/keyHighlightsController');

// router.post('/extract-key-highlights', extractKeyHighlights);
// router.post('/extract-key-highlights-pdf', upload.single('file'), extractHighlightsFromPdf);

// module.exports = router;
