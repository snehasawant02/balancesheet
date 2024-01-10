// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

// Serve the static React app
app.use(express.static(path.join(__dirname, 'file-upload-app/build')));

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Access the uploaded file from req.file
    const uploadedFile = req.file;

    // Perform any additional processing if needed

    // Send a success response
    res.json({ message: 'File uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
