require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const summarizationRoutes = require('./routes/summarization');
const plagiarismRoutes = require('./routes/plagiarism');
// const keyHighlightsRoutes = require('./routes/keyHighlights');
const keyHighlightsRoutes = require('./routes/keyHighlights');



const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Mount routes
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/summarize', summarizationRoutes);
app.use('/plagiarism', plagiarismRoutes);
app.use('/highlights', keyHighlightsRoutes);
// app.use('/key-highlights', keyHighlightsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
