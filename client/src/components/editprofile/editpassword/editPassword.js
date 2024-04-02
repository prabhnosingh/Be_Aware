import React, { useState } from 'react';
import './editprofile-style.css'; // Import the CSS file
import beawareLogo from '../../../img/beaware_logo.png'; // Import the logo image
import manageProfileImage from '../../../img/manageprofile.png'; // Import the manage profile image
import securityImage from '../../../img/security.png';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../../firebase'; // Import your Firebase configuration
import { getAuth, reauthenticateWithCredential , updatePassword ,EmailAuthProvider,getIdToken } from 'firebase/auth';

const EditPasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

  }
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
  

  const handleSaveChanges = async () => {
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm password:', confirmPassword);
  
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match.");
      return;
    }
  
    try {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      console.log(user.password)

      
      if (!user) {
        alert('User not authenticated.');
        return;
      }
  
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert('Password changed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please try again.');
    }
  };
   
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src={beawareLogo} alt="BeAware Logo" className="logo" /> {/* Logo image */}
        <div className="button-wrapper">
        {/* <button onClick={handleEmailClick}>Email</button> */}
          <button onClick={handleSecurityClick}>Password</button>
          <button onClick={handleStreamClick}>Stream</button>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            
  <button onClick={handleBackClick}>Back</button>
</div>
          
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

        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <button className="save-button" onClick={handleSaveChanges}>Change Password</button>
      </div>
      {/* JSX code */}
      <div className="security-image-container">
        <img src={securityImage} alt="Security Image" className="security-image" />
      </div>
      <div id="footer2">
    <p>&copy; 2024 BeAware. All rights reserved.</p>
  </div>
    </div>
  );
};

export default EditPasswordPage;
