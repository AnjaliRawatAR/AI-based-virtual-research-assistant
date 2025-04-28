import React, { useState } from 'react';
import '../styles/KeyHighlights.css';

const KeyHighlights = () => {
  const [text, setText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [highlights, setHighlights] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExtractHighlights = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('http://localhost:8000/extract-key-highlights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setHighlights(data.highlights);
    } catch (error) {
      console.error('Error extracting highlights:', error);
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
        // TODO: Replace with actual API endpoint for extracting highlights from PDF
        const response = await fetch('http://localhost:8000/extract-key-highlights', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setText(data.extractedText); // Set extracted text from the PDF
      } catch (error) {
        console.error('Error extracting highlights from PDF:', error);
      }
    }
  };

  return (
    <div className="key-highlights-container">
      <h2>Key Highlights</h2>
      <form onSubmit={handleExtractHighlights} className="key-highlights-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to extract key highlights..."
          className="key-highlights-textarea"
          rows="6"
        ></textarea>
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
        <button type="submit" className="extract-button" disabled={isLoading}>
          {isLoading ? 'Extracting...' : 'Extract Highlights'}
        </button>
      </form>
      {highlights && (
        <div className="highlights-result">
          <h3>Extracted Highlights:</h3>
          <p>{highlights}</p>
        </div>
      )}
    </div>
  );
};

export default KeyHighlights;