import React, { useState } from 'react';
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../../img/manageprofile.png'; // Import the manage profile image
import messageImage from '../../../img/message.png';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation hooks
import { firebaseApp } from '../../../firebase'; // Import your Firebase configuration

const EditStreamPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the location object

  const [color, setColor] = useState('#FFFFFF'); // Initial color state
  const [newLogoUrl, setNewLogoUrl] = useState(''); // State for new logo URL

  const userData = location.state ? location.state.userData : null; // Retrieve userData from location state if available

  const handleSaveChanges = async () => {
    try {
      const currentUser = firebaseApp.auth().currentUser;
      console.log('current user :',currentUser)

      // Update color in Firebase
      await firebaseApp.firestore().collection('users').doc(currentUser.uid).update({
        color: color
      });

      // Update new logo URL in Firebase
      await firebaseApp.firestore().collection('users').doc(currentUser.uid).update({
        logoUrl: newLogoUrl
      });

      // Redirect back to dashboard after saving changes
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleEmailClick = () => {
    // Redirect to the email page
    navigate('/editprofile', { state: { userData: userData } });
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
    // Redirect to the dashboard page
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
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      
      <div className="input-container">
        <input
          type="url"
          placeholder="Enter new logo URL"
          value={newLogoUrl}
          onChange={(e) => setNewLogoUrl(e.target.value)}
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
