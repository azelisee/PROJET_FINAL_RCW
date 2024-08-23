import React, { useState } from 'react';
import axios from 'axios';
import '../../css/diagnose.css'

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/diagnose/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDiagnosis(response.data);
    } catch (error) {
      console.error('Error during diagnosis:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-image-container">
      <center><h1>Welcome to our Diagnose Room</h1></center>
      <p>Please follow the steps below to get your medical diagnosis:</p>
      <ol>
        <li>Click on "Choose a file" to upload an image of your medical scan.</li>
        <li>Once your file is selected, click on the "Diagnose" button.</li>
        <li>Wait for the system to analyze the image. This may take a few minutes.</li>
        <li>Your diagnosis, recommended treatment, and specialist details will appear below.</li>
      </ol>
      <div>
        <input type="file" onChange={handleFileChange} className="file-input"/>
      </div>
      <div>
        <button onClick={handleSubmit} disabled={loading} className="diagnose-button">
          {loading ? "Processing..." : "Diagnose"}
        </button>
      </div>
      {loading && <p className="loading-message">This may take a few minutes, please wait...</p>}
      {diagnosis && (
        <div className="diagnosis-result">
          <h2>Diagnostic Result</h2>
          <p><strong>Diagnosis:</strong> {diagnosis.diagnosis}</p>
          <p><strong>Recommended Treatment:</strong> {diagnosis.treatment}</p>
          <p><strong>Recommended Specialist:</strong> {diagnosis.specialist}</p>

          <div className="chatbot-link">
            <a href="http://localhost:8501/?name=chatbot.py" target="_blank" rel="noopener noreferrer" className="chatbot-button">
              Discuss with Medical Assistant Bot
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
