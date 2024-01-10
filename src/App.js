// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './signin';
import FileUpload from './FileUpload'; // Adjust the path accordingly

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/file-upload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
