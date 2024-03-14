import React, { useState } from 'react';
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../../img/manageprofile.png'; // Import the manage profile image
import messageImage from '../../../img/message.png';
import { Link, useNavigate } from 'react-router-dom';

const EditPasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
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


  const handleSaveChanges = () => {
    // Add logic to save changes
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
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
      <div className="input-container">
      <p style={{ color: '#1B4375' }}>Change Password</p>
        <input
          type="password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <button className="save-button" onClick={handleSaveChanges}>Change Password</button>
      </div>
      {/* JSX code */}
      <div className="message-image-container">
        <img src={messageImage} alt="Message Image" className="message-image" />
      </div>
    </div>
  );
};

export default EditPasswordPage;
