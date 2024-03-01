import React, { useState } from 'react';
import './setPassword.css';
import forgotImage from './forgot.jpg'; 

const SetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        
        setSuccessMessage('Password updated successfully');
        setError(null);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="s-container">
            <div className="left-container">
                <img src={forgotImage} alt="Forgot Password" className="forgot-image" />
            </div>
            <div className="right-container">
                <h1 className="heading">Set New Password</h1>
                <div className="form-container">
                    <div>
                        <label>New Password:</label>
                        <input type="password" value={newPassword} onChange={handleNewPasswordChange} className="input-field" />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="input-field" />
                    </div>
                    <button onClick={handleSubmit} className="button">Submit</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default SetPassword;
