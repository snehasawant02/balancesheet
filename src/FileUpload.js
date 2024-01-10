import React, { useState } from 'react';
import axios from 'axios';

const mainColor = '#5f6982';
const inColor = '#e2e2e2';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  const [outputFilePath, setOutputFilePath] = useState();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
      });

      setOutputFilePath(response.data.output_excel_path);

      if (window.confirm('File processed successfully. Do you want to download the file?')) {
        const downloadURL = `http://127.0.0.1:5000/${encodeURIComponent(response.data.output_excel_path)}`;
        window.open(downloadURL, '_blank');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. See console for details.');
    }
  };

  const outerBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: inColor,
  };

  const innerBoxStyles = {
    border: `0px outset ${mainColor}`,
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    boxShadow: `0 0 15px rgba(0, 0, 0, 0.5)`,
    width: '60%',
    height: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const headingStyles = {
    color: mainColor,
    marginBottom: '5px',
  };

  const subHeadingStyles = {
    color: mainColor,
    marginTop: '5px',
  };

  const selectStyles = {
    backgroundColor: mainColor,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const uploadButtonStyles = {
    backgroundColor: mainColor,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    border: `2px solid ${mainColor}`,
    transition: 'margin 0.3s ease',
  };

  uploadButtonStyles[':hover'] = {
    margin: '0',
  };

  const downloadLinkStyles = {
    color: mainColor, // Link color
    textDecoration: 'underline', // Underline on hover
    cursor: 'pointer',
    marginTop: '10px', // Adjust the space between the heading and the download link
  };

  return (
    <div style={outerBoxStyles}>
      <div style={innerBoxStyles}>
        <h2 style={headingStyles}>File Upload</h2>
        <input type="file" onChange={onFileChange} style={selectStyles} />
        <button onClick={onUpload} style={uploadButtonStyles}>
          Upload File
        </button>

        {uploadProgress > 0 && <p style={subHeadingStyles}>Upload Progress: {uploadProgress.toFixed(2)}%</p>}

        {outputFilePath && (
          <div>
            <h3 style={headingStyles}>Generated Output File</h3>
            <a href={`http://127.0.0.1:5000/${outputFilePath}`} download style={downloadLinkStyles}>
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
