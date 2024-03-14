import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../img/manageprofile.png'; // Import the manage profile image
import messageImage from '../../img/message.png';

const EditProfilePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [newEmail, setNewEmail] = useState('');

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSaveChanges = () => {
    // Add logic to save changes
    console.log('New email:', newEmail);
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

      {/* Input Field and Button */}
      <div className="input-container">
        <p style={{ color: '#1B4375' }}>Your current email is abc@gmail.com</p>
        <input
          type="text"
          placeholder="Enter your new email"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
      </div>
      {/* JSX code */}
      <div className="message-image-container">
        <img src={messageImage} alt="Message Image" className="message-image" />
      </div>
    </div>
  );
};

export default EditProfilePage;
