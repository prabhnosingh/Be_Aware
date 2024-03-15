import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './editprofile-style.css';
import beawareLogo from '../../img/beaware_logo.png';
import manageProfileImage from '../../img/manageprofile.png';
import messageImage from '../../img/message.png';
import { useLocation } from 'react-router-dom';
import { firebaseApp } from '../../firebase'; // Import your Firebase configuration

const EditProfilePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
    }
  }, [location.state]);

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      // Update email locally
      const updatedUserData = { ...userData, email: newEmail };
      setUserData(updatedUserData);
      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      // Update email in Firebase
      const currentUser = firebaseApp.auth().currentUser;
      if (currentUser) {
        console.log('current user',currentUser.email)
        await currentUser.updateEmail(newEmail);
        // Display success message
        window.alert('Email changed successfully!');
        // Redirect to the dashboard page
        navigate('/dashboard');
      } else {
        console.error("No user is currently signed in.");
      }
    } catch (error) {
      console.error("Error updating email:", error.message);
    }
  };

  const handleEmailClick = () => {
    navigate('/editprofile');
  };

  const handleSecurityClick = () => {
    navigate('/editpassword');
  };

  // const handleStreamClick = () => {
  //   navigate('/editstream');
  // };

  const handleStreamClick = () => {
    // Navigate to the EditStreamPage and pass userData as state
    navigate('/editstream', { state: { userData } });
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <nav className="navbar">
        <img src={beawareLogo} alt="BeAware Logo" className="logo" />
        <div className="button-wrapper">
          <button onClick={handleEmailClick}>Email</button>
          <button onClick={handleSecurityClick}>Security</button>
          <button onClick={handleStreamClick}>Stream</button>
          <button onClick={handleBackClick}>Back</button>
        </div>
      </nav>

      <div className="image-container">
        <img src={manageProfileImage} alt="Manage Profile" className="manage-profile-image" />
      </div>

      <div className="input-container">
        <p style={{ color: '#1B4375' }}>Your current email is {userData ? userData.email : ""}</p>
        <input
          type="text"
          placeholder="Enter your new email"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
      </div>

      <div className="message-image-container">
        <img src={messageImage} alt="Message Image" className="message-image" />
      </div>
    </div>
  );
};

export default EditProfilePage;
