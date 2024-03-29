import React from 'react';
import './deleteprofilecnf-style.css';
import rectangle135 from './src/img/Rectangle 135.png';
import beAwareLogo from './src/img/logo-dark-removebg-preview 1.png';
import deleteProfileLogo from './src/img/deleteProfilelogo.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Update the path to firebase as per your project

const DeleteProfileCnfComponent = () => {
    const navigate = useNavigate();

    const redirectToDeleteProfile = async () => {
        try {
            // Delete user profile
            const user = auth.currentUser;
            if (user) {
                await user.delete();
                console.log('User profile deleted successfully.');
                // navigate('/deleteprofile');
            }
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                alert('For security reasons, please log in again to delete your profile.');
                navigate('/'); // rdirect to login page
            } else {
                console.error('Error deleting user profile:', error.message);
                // Handle other errors appropriately
                alert('Operation failed, try again...');
            }
        }
    };

    const redirectToSignUp = async () => {
        try {
            // Delete user profile
            const user = auth.currentUser;
            if (user) {
                await user.delete();
                console.log('User profile deleted successfully.');
                console.log('User redirected to Sign Up.');
                navigate('/', { state: { isSignUpMode: true } }); //redirect to sign up page
            }
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                alert('For security reasons, please log in again to delete your profile.');
                navigate('/'); // rdirect to login page
            } else {
                console.error('Error deleting user profile:', error.message);
                // Handle other errors appropriately
                alert('Operation failed, try again...');
            }
        }
    };

    const redirectToDashboard = () => {
        navigate('/dashboard'); // Navigate to the dashboard page
    };

    return (
        <div>
            <div id="deletePrfoileCnf">
                <div id="deletePrfoileCnfTopbar">
                    <img src={beAwareLogo} alt="BeAware Logo" id="bewareLogo"/>
                    <img src={rectangle135} alt="Rectangle 135.png" id="rectangle135" />
                </div>
                <div id="deletePrfoileCnfMain">
                    <h2>Delete Your Account</h2>
                    <br/>
                    <h4>Are you sure that you want to delete your account? If you delete your account, all your data will be wiped out.</h4>
                    <br/>
                    <h4>Are you absolutely sure you want to proceed?</h4>
                    <br/>
                    <img src={deleteProfileLogo} alt="delete profile img"/>
                    <div id="deletePrfoileCnfBtn">
                        <table>
                            <tr>
                                <td id="deletePrfoileYesBtn">
                                    {/* <button onClick={redirectToDeleteProfile}>Yes, Delete</button> */}
                                    <button onClick={redirectToSignUp}>Yes, Delete</button>
                                </td>
                                <td id="deletePrfoileCancelBtn">
                                    <button onClick={redirectToDashboard}>Cancel</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProfileCnfComponent;