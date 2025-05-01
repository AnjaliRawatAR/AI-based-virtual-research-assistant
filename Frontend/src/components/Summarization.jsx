import React, { useState } from 'react';
import '../styles/Summarization.css';

const Summarization = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleSummarize = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://localhost:8000/summarize/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      console.log('Summary received:', data.summary);
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // TODO: Replace with actual API endpoint for PDF processing
        const response = await fetch('http://localhost:8000/summarize/extract-pdf-text', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setText(data.extractedText); // Set extracted text from the PDF
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
      }
    }
  };

  return (
    <div className="summarization-container">
      <div className="summarization-section">
        <h2>Summarization Tool</h2>
        <form onSubmit={handleSummarize} className="summarization-form">
          <div className="textarea-and-result">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to summarize..."
              className="summarization-textarea"
              rows="10"
            ></textarea>
            <div className="result-area">
              {summary ? (
                <div className="summary-result">
                  <h3>Summary:</h3>
                  <p>{summary}</p>
                </div>
              ) : (
                <p className="placeholder-text">You will see your results here</p>
              )}
            </div>
          </div>
          <div className="file-upload">
            <label htmlFor="pdf-upload" className="file-upload-label">
              Upload PDF
            </label>
            <input
              type="file"
              id="pdf-upload"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="file-upload-input"
            />
          </div>
          <button type="submit" className="summarize-button" disabled={isLoading}>
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Summarization;