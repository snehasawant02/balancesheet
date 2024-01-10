// SignIn.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const onSignIn = () => {
    // In a real application, you would perform authentication here

    // For the example, simply navigate to FileUpload.js
    navigate('/file-upload');
  };

  return (
    <div style={outerContainerStyles}>
      <div style={innerContainerStyles} className="signin-box">
        {/* Logo */}
        <img
          src="logo_with_padding.png"
          alt="Logo"
          style={logoStyles}
        />
        {/* Username input */}
        <div style={inputBoxStyles}>
          <label style={labelStyles}>
            Username:
            <input type="text" style={inputStyles} id="username" name="username" autoComplete="off" />
          </label>
        </div>

        {/* Password input */}
        <div style={inputBoxStyles}>
          <label style={labelStyles}>
            Password:
            <input type="password" style={inputStyles} id="password" name="password" autoComplete="off" />
          </label>
        </div>

        {/* Sign In button */}
        <button onClick={onSignIn} style={signInButtonStyles}>
          Sign In
        </button>
      </div>
    </div>
  );
};

const outerContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#e6e6e6', // Dark grey background color
};

const innerContainerStyles = {
  border: '0px solid #5f6982', // Blue border
  borderRadius: '10px',
  padding: '100px',
  backgroundColor: '#f2f2f2', // Blue background color
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Light shadow effect
  transition: 'box-shadow 0.3s ease', // Smooth transition for shadow change
};

innerContainerStyles[':hover'] = {
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.8)', // Deeper shadow on hover
};

const logoStyles = {
  width: '100px', // Set the width of the logo as needed
  height: 'auto', // Maintain aspect ratio
  marginBottom: '20px', // Add margin at the bottom of the logo
};

const inputBoxStyles = {
  margin: '15px 0', // Increased margin
};

const inputStyles = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px', // Increased padding
  fontSize: '18px', // Increased font size
};

const labelStyles = {
  fontWeight: 'bold', // Make text bold
  fontSize: '16px', // Increase font size
  display: 'block', // Make label a block element
  marginBottom: '5px', // Add margin at the bottom of the label
};

const signInButtonStyles = {
  backgroundColor: '#5f6982', // Blue background color
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
  display: 'block', // Make button a block element
  marginLeft: 'auto', // Center-align the button
  marginRight: 'auto', // Center-align the button
};

export default SignIn;
