import React, { useState } from 'react';
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../../img/manageprofile.png'; // Import the manage profile image
import securityImage from '../../../img/security.png';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation hooks
import { firebaseApp } from '../../../firebase'; // Import your Firebase configuration
import {   HuePicker } from 'react-color'

const EditStreamPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the location object
  const [errors, setErrors] = useState({});

  const [newColor, setNewColor] = useState(''); // Initial color state
  const [newLogoUrl, setNewLogoUrl] = useState(''); // State for new logo URL
  const [newUsername, setNewUsername] = useState('');
  const [background, setBackground] = useState('#fff');
  const [hexCode, setHexCode] = useState('#fff');

  const userData = location.state ? location.state.userData : null; // Retrieve userData from location state if available
  const handleHexCodeChange = (event) => {
    const newHexCode = event.target.value;
    setHexCode(newHexCode);
    setBackground(newHexCode);
  };
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  const handleColorChange = (color) => {
    setBackground(color.hex);
    setHexCode(color.hex);
    setNewColor(color.hex);
  };
  const handleSaveChanges = async () => {
    try {
      const currentUser = firebaseApp.auth().currentUser;
  
      if (!currentUser) {
        // Handle scenario where the user is not authenticated
        throw new Error('User not authenticated');
      }
      
  
      console.log('current user:', currentUser.email);
  
      // Fetch the old values from Firebase if either color or newLogoUrl is empty
      let oldColor = '';
      let oldUrl = '';
      let oldUsername = '';
  
      if (!hexCode || !newLogoUrl || !newUsername) {
        const userDoc = await firebaseApp.firestore().collection('users').doc(currentUser.uid).get();
        const userData = userDoc.data();
  
        // Set default color to light grey if color is not defined in Firebase
        oldColor = userData.color !== undefined && userData.color !== null ? userData.color : '#CCCCCC';
        oldUrl = userData.url || ''; // Default to empty string if url is not defined in Firebase
        oldUsername = userData.username || '';
      }
  
      console.log(oldColor)
      console.log(oldUrl)

      console.log(hexCode)
      console.log(newLogoUrl)

      // Update color and URL in Firebase
      await firebaseApp.firestore().collection('users').doc(currentUser.uid).update({
        color: hexCode || oldColor, // Use old value or default if color is empty
        url: newLogoUrl || oldUrl, // Use old value if newLogoUrl is empty
        username: newUsername || oldUsername
      });
  
      // Redirect back to dashboard after saving changes
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving changes:', error);
      // Display an error message to the user or handle the error gracefully
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
    <>
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src={beawareLogo} alt="BeAware Logo" className="logo" /> {/* Logo image */}
        <div className="button-wrapper">
          {/* <button onClick={handleEmailClick}>Email</button> */}
          <button onClick={handleSecurityClick}>Password</button>
          <button onClick={handleStreamClick}>Stream</button>
          <button onClick={handleBackClick}>Back</button> {/* Go back functionality */}
        </div>
      </nav>

      {/* Image */}
      <div className="image-container">
        <img src={manageProfileImage} alt="Manage Profile" className="manage-profile-image" />
      </div>

      {/* Input Fields and Button */}
      {/* <div className="color-change">
        <p className="edit-text">Edit Color / Stream Name / Logo URL</p>
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
      </div> */}
      <div className="input-field" style={{ marginLeft: '60px' }}>
  <i className="fas fa-user"></i>
  <input 
    type="text" 
    id="hexcode" 
    value={hexCode} 
    onChange={handleHexCodeChange} 
  />
</div>


<div className="colorfield" style={{ marginLeft: '90px' }}>
<HuePicker color={background} onChange={handleColorChange} />
</div>
      
      <div className="input-container">
      <input
          type="text"
          placeholder="Enter new Stream Name"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="url"
          placeholder="Enter new logo URL"
          value={newLogoUrl}
          onChange={(e) => setNewLogoUrl(e.target.value)}
        />
        <button className="save-button" onClick={handleSaveChanges}>Save changes</button>
      </div>

      {/* JSX code */}
      <div className="security-image-container">
        <img src={securityImage} alt="Security Image" className="security-image" />
      </div>
      
    <div id="footer1">
    <p>&copy; 2024 BeAware. All rights reserved.</p>
  </div>
    </div>
    </>
  );
};

export default EditStreamPage;