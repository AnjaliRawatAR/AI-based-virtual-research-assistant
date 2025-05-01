import React, { useState } from 'react';
import '../styles/PlagiarismDetector.css';

const PlagiarismDetector = () => {
  const [file, setFile] = useState(null);
  const [plagiarismPercentage, setPlagiarismPercentage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPlagiarismPercentage(null); // Reset result when a new file is uploaded
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/plagiarism/check-plagiarism', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPlagiarismPercentage(data.percentage);
    } catch (error) {
      console.error('❌ Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plagiarism-container">
      <h2>Plagiarism Checker</h2>

      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleSubmit} disabled={loading || !file}>
        {loading ? 'Checking...' : 'Check Plagiarism'}
      </button>

      {plagiarismPercentage !== null && (
        <div className="circle-container">
          <div
            className="circular-progress"
            style={{
              background: `conic-gradient(#005eff ${plagiarismPercentage}%, #d4e3ff ${plagiarismPercentage}% 100%)`,
            }}
          >
            <div className="circle-inner">
              <span>{typeof plagiarismPercentage === 'number' ? `${plagiarismPercentage}%` : '0%'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismDetector;

// import React, { useState } from 'react';
// import '../styles/PlagiarismDetector.css';

// const PlagiarismDetector = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [plagiarismReport, setPlagiarismReport] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     setPdfFile(file);

//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);

//       try {
//         // TODO: Replace with actual API endpoint for plagiarism detection
//         const response = await fetch('http://localhost:8000/check-plagiarism', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         setPlagiarismReport(data.report); // Set plagiarism report from the PDF
//       } catch (error) {
//         console.error('Error checking plagiarism for PDF:', error);
//       }
//     }
//   };

//   return (
//     <div className="plagiarism-detector-container">
//       <h2>Plagiarism Detector</h2>
//       <div className="file-upload">
//         <label htmlFor="pdf-upload" className="file-upload-label">
//           Upload PDF
//         </label>
//         <input
//           type="file"
//           id="pdf-upload"
//           accept="application/pdf"
//           onChange={handlePdfUpload}
//           className="file-upload-input"
//         />
//       </div>
//       {isLoading && <p>Checking for plagiarism...</p>}
//       {plagiarismReport && (
//         <div className="plagiarism-report">
//           <h3>Plagiarism Report:</h3>
//           <p>{plagiarismReport}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlagiarismDetector;