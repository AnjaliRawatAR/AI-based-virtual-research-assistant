const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Allow requests from any frontend
app.use(express.json());

// Route: /search?query=your-topic
app.get('/search', async (req, res) => {
  const query = req.query.query;
  const apiUrl = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`;

  try {
    const response = await axios.get(apiUrl);
    const parsed = await xml2js.parseStringPromise(response.data, { explicitArray: false });
    const entries = parsed.feed.entry || [];

    // Format results
    const results = (Array.isArray(entries) ? entries : [entries]).map(entry => ({
      title: entry.title,
      description: entry.summary,
      source: 'arXiv',
      date: entry.published,
      link: entry.id
    }));

    res.json(results);
  } catch (error) {
    console.error("Error fetching from arXiv:", error.message);
    res.status(500).json({ error: "Failed to fetch data from arXiv" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
