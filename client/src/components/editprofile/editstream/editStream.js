import React, { useState } from 'react';
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../../img/manageprofile.png'; // Import the manage profile image
import messageImage from '../../../img/message.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

const EditStreamPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [color, setColor] = useState('#FFFFFF'); // Initial color state
  const [newLogoUrl, setNewLogoUrl] = useState(''); // State for new logo URL

  const handleChangeColor = () => {
    // Function to handle color change
    const newColor = getRandomColor(); // Get random color
    setColor(newColor); // Update color state
  };

  const getRandomColor = () => {
    // Function to generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleNewLogoUrlChange = (e) => {
    // Function to handle new logo URL change
    setNewLogoUrl(e.target.value); // Update new logo URL state
  };

  const handleSaveChanges = () => {
    // Add logic to save changes
    console.log('New logo URL:', newLogoUrl);
  };

  const handleEmailClick = () => {
    // Redirect to the email page
    navigate('/editprofile');
  };

  const handleSecurityClick = () => {
    // Redirect to the security page
    navigate('/editpassword');
  };

  const handleStreamClick = () => {
    // Redirect to the stream page
    navigate('/editstream');
  };
  const handleBackClick = () => {
    // Redirect to the stream page
    navigate('/dashboard');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src={beawareLogo} alt="BeAware Logo" className="logo" /> {/* Logo image */}
        <div className="button-wrapper">
          <button onClick={handleEmailClick}>Email</button>
          <button onClick={handleSecurityClick}>Security</button>
          <button onClick={handleStreamClick}>Stream</button>
          <button onClick={handleBackClick}>Back</button> {/* Go back functionality */}
        </div>
      </nav>

      {/* Image */}
      <div className="image-container">
        <img src={manageProfileImage} alt="Manage Profile" className="manage-profile-image" />
      </div>

      {/* Input Fields and Button */}
      <div className="color-change">
        <p className="edit-text">Edit color and stream</p>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)} // Update color on input change
        />
      </div>
      
      <div className="input-container">
        <input
          type="url"
          placeholder="Enter new logo URL"
          value={newLogoUrl}
          onChange={handleNewLogoUrlChange}
        />
        <button className="save-button" onClick={handleSaveChanges}>Save changes</button>
      </div>

      {/* JSX code */}
      <div className="message-image-container">
        <img src={messageImage} alt="Message Image" className="message-image" />
      </div>
    </div>
  );
};

export default EditStreamPage;
