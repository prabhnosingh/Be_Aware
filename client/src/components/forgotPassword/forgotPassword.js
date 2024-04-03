
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './forgotPassword.css';
 
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
 
    const handleCheckEmail = async () => {
        try {
            if (!email) {
                setError('Please provide your email.');
                return;
            }
 
            await auth.sendPasswordResetEmail(email);
            setSuccessMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            setError('Failed to send password reset email. Please try again later.');
            console.error(error.message);
        }
    };
 
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
   
 
    return (
        <div className="forgot-password-container">
            <div className="left-container-forgot-password">
                <div className="background-overlay"></div>
            </div>
 
            <div className="right-container-forgot-password">
                <div className="form-container-forgot-password">
                    <h1 className="heading-forgot-password">Can't Sign in?</h1><br/><br/>
                    <h3>Email</h3>
                    <p>Enter the email address associated with this account:</p><br/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="input-field-forgot-password"
                    /><br/>
                    <button onClick={handleCheckEmail} className="button-forgot-password" >Continue</button>
                    {/* <button onClick={handleGoToHomePage} className="button-forgot-password" >Go to Homepage</button> */}
 
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <div className="button-container">
                    <Link to="/" className="button-forgot-password">Go to Homepage</Link>
    </div>
                </div>
            </div>
</div>
 
    );
};
 
export default ForgotPassword;