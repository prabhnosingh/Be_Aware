import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import './setPassword.css';
import forgotImage from './forgot.jpg'; 

const SetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to reset password
    const handleResetPassword = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const oobCode = searchParams.get('oobCode');

            if (!newPassword || !confirmPassword) {
                setError("Please fill in both fields.");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            await auth.confirmPasswordReset(oobCode, newPassword);
            setSuccessMessage("Password reset successful. You can now sign in with your new password.");
            navigate('/'); // Redirect to main page after successful password reset
        } catch (error) {
            setError("Failed to reset password. Please try again.");
            console.error(error.message);
        }
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="f-container">
            <div className="image-container">
                <img src={forgotImage} alt="Forgot Password" className="forgot-image" />
            </div>
            <div className="form-container">
                <h1 className="heading">Set New Password</h1>
                <h3><br /> New Password</h3>
                <input type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} className="input-field" />
                <h3><br /> Confirm Password</h3>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="input-field" />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button onClick={handleResetPassword} className="button">Submit</button>
            </div>
        </div>
    );
};

export default SetPassword;
