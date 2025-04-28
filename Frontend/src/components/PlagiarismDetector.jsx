import React, { useState } from 'react';
import '../styles/PlagiarismDetector.css';

const PlagiarismDetector = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [plagiarismReport, setPlagiarismReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // TODO: Replace with actual API endpoint for plagiarism detection
        const response = await fetch('http://localhost:8000/check-plagiarism', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setPlagiarismReport(data.report); // Set plagiarism report from the PDF
      } catch (error) {
        console.error('Error checking plagiarism for PDF:', error);
      }
    }
  };

  return (
    <div className="plagiarism-detector-container">
      <h2>Plagiarism Detector</h2>
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
      {isLoading && <p>Checking for plagiarism...</p>}
      {plagiarismReport && (
        <div className="plagiarism-report">
          <h3>Plagiarism Report:</h3>
          <p>{plagiarismReport}</p>
        </div>
      )}
    </div>
  );
};

export default PlagiarismDetector;