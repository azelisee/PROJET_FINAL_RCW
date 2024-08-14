import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/diagnose/', formData);
      setDiagnosis(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Diagnostiquez</button>
      {diagnosis && (
        <div>
          <h3>Diagnostic: {diagnosis.diagnosis}</h3>
          <p>Traitement recommandé: {diagnosis.treatment}</p>
          <p>Spécialiste recommandé: {diagnosis.specialist}</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
