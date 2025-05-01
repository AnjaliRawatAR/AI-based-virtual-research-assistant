const axios = require('axios');

exports.compareTextChunks = async (text) => {
  const chunkSize = 500;
  const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g'));
  let plagCount = 0;

  for (const chunk of chunks) {
    const response = await axios.post(
      // 'https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-MiniLM-L6-v2'
      'https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
      { inputs: { source_sentence: chunk, sentences: [chunk.split(' ').reverse().join(' ')] } },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
    );

    const score = response.data[0].score;
    if (score > 0.9) plagCount++;
  }

  const percentage = Math.round((plagCount / chunks.length) * 100);
  return percentage;
};
