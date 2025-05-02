import React, { useState } from 'react';
import '../styles/KeyHighlights.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/highlights';

const KeyHighlights = () => {
  const [text, setText] = useState('');
  const [highlights, setHighlights] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    setHighlights('');
    setError('');
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    setError('');
    setHighlights('');

    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${BACKEND_URL}/extract-key-highlights-pdf`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setText(data.extractedText || '');
      } else {
        setError(data.error || 'Failed to extract text from PDF.');
      }
    } catch (err) {
      console.error('❌ PDF Upload Error:', err);
      setError('Error during PDF processing.');
    }
  };

  const handleExtractHighlights = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter text or upload a PDF first.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/extract-key-highlights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setHighlights(data.highlights || 'No highlights found.');
      } else {
        setError(data.error || 'Failed to extract highlights.');
      }
    } catch (err) {
      console.error('❌ Highlight Extraction Error:', err);
      setError('An error occurred during highlight extraction.');
    }

    setIsLoading(false);
  };

  return (
    <div className="key-highlights-container">
      <h2>🔍 Key Highlights Extractor</h2>

      <form onSubmit={handleExtractHighlights} className="key-highlights-form">
        <div className="file-upload">
          <label htmlFor="pdf-upload" className="file-upload-label">
            📄 Upload PDF
          </label>
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="file-upload-input"
          />
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your text here or upload a PDF..."
          className="text-box"
          rows="12"
        />

        <button
          type="submit"
          className="extract-btn"
          disabled={isLoading || (!text.trim() && !pdfFile)}
        >
          {isLoading ? 'Extracting...' : 'Extract Highlights'}
        </button>
      </form>

      {error && <p className="error-message">❗ {error}</p>}

      {highlights && (
        <div className="results-section">
          <h3>📌 Key Highlights</h3>
          <pre>{highlights}</pre>
        </div>
      )}
    </div>
  );
};

export default KeyHighlights;

// import React, { useState } from 'react';
// import '../styles/KeyHighlights.css';

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const KeyHighlights = () => {
//   const [text, setText] = useState('');
//   const [pdfFile, setPdfFile] = useState(null);
//   const [highlights, setHighlights] = useState([]); // Changed to array
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null); // Add error state

//   const handleExtractHighlights = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);
//     console.log('Extract Highlights triggered with text:', text); // Debugging log
//     try {
//       // const response = await fetch('http://localhost:8000/extract-key-highlights', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ text }),
//       const response = await fetch(`${BACKEND_URL || 'http://localhost:8000'}/api/highlights/extract-key-highlights`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text }),
//       });
  
//       console.log('Response status:', response.status); // Debugging log
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error response from server:', errorData); // Debugging log
//         throw new Error(errorData.error || 'Failed to extract highlights');
//       }
  
//       const data = await response.json();
//       console.log('Highlights data received:', data); // Debugging log
//       setHighlights(
//         data.highlights
//           ? data.highlights.split('\n\n').filter(h => h.trim() !== '')
//           : []
//       );
//     // } catch (error) {
//     //   console.error('Error extracting highlights:', error); // Debugging log
//     //   setError(error.message || 'Failed to extract highlights');
//     //   setHighlights([]); // Clear highlights on error
//     // } 
//   } catch (error) {
//     let errorMessage = 'Failed to extract highlights';
//     if (error.name === 'SyntaxError') {
//       errorMessage = 'Received invalid response from server';
//     } else if (error.message) {
//       errorMessage = error.message;
//     }
//     setError(errorMessage);
//     console.error('Full error:', error);
//     setHighlights([]); // Clear highlights on error
//   }
//     finally {
//       setIsLoading(false);
//       console.log('Extract Highlights process completed'); // Debugging log
//     }
//   };

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     setPdfFile(file);
//     setError(null); // Reset any previous errors
//     setHighlights([]); // Clear previous highlights
//     console.log('PDF file selected:', file); // Debugging log

//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       setIsLoading(true);

//       try {
//         // const response = await fetch('http://localhost:8000/extract-key-highlights-pdf', {
//         //   method: 'POST',
//         //   body: formData,
//         const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/highlights/extract-key-highlights-pdf`, {
//           method: 'POST',
//           body: formData,
//         });

//         console.log('Response status for PDF:', response.status); // Debugging log
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error('Error response from server for PDF:', errorData); // Debugging log
//           throw new Error(errorData.error || 'Failed to process PDF');
//         }

//         const data = await response.json();
//         console.log('PDF highlights data received:', data); // Debugging log

//         // Update both text and highlights
//         setText(data.extractedText || '');
//         setHighlights(
//           data.highlights
//             ? data.highlights.split('\n\n').filter(h => h.trim() !== '')
//             : []
//         );
//       // } catch (error) {
//       //   console.error('PDF processing error:', error); // Debugging log
//       //   setError(error.message || 'Failed to extract highlights from PDF');
//       //   setText(''); // Clear text on error
//       //   setHighlights([]); // Clear highlights on error
//       // } 
//     } catch (error) {
//       let errorMessage = 'Failed to extract highlights from PDF';
//       if (error.name === 'SyntaxError') {
//         errorMessage = 'Received invalid response from server';
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
//       setError(errorMessage);
//       console.error('Full error:', error);
//       setText(''); // Clear text on error
//       setHighlights([]); // Clear highlights on error
//     }
//       finally {
//         setIsLoading(false);
//         console.log('PDF processing completed'); // Debugging log
//       }
//     }
//   };

//   return (
//     <div className="key-highlights-container">
//       <h2>Key Highlights</h2>
//       <form onSubmit={handleExtractHighlights} className="key-highlights-form">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Paste your text here to extract key highlights..."
//           className="key-highlights-textarea"
//           rows="6"
//         ></textarea>
//         <div className="file-upload">
//           <label htmlFor="pdf-upload" className="file-upload-label">
//             Upload PDF
//           </label>
//           <input
//             type="file"
//             id="pdf-upload"
//             accept="application/pdf"
//             onChange={handlePdfUpload}
//             className="file-upload-input"
//           />
//         </div>
//         <button
//           type="submit"
//           className="extract-button"
//           disabled={isLoading || (!text.trim() && !pdfFile)} // Ensure text is trimmed
//         >
//           {isLoading ? 'Extracting...' : 'Extract Highlights'}
//         </button>
//       </form>

//       {error && <p className="error-message">{error}</p>}

//       {highlights.length > 0 ? (
//         <div className="highlights-result">
//           <h3>Extracted Highlights ({highlights.length}):</h3>
//           <div className="highlight-items">
//             {highlights.map((highlight, index) => (
//               <div key={index} className="highlight-item">
//                 <span className="highlight-number">{index + 1}.</span>
//                 <p className="highlight-text">{highlight}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         !isLoading && <p className="no-highlights-message">No highlights found. Please try again with different content.</p>
//       )}

//       {isLoading && (
//         <div className="loading-indicator">
//           <div className="spinner"></div>
//           <p>{pdfFile ? 'Processing your PDF...' : 'Processing your content...'}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KeyHighlights;