import React from 'react';
import './deletprofilecnf-style.css'; // Import your CSS file

import rectangle135 from './src/img/Rectangle 135.png'
// import rectangle135 from './src/img/Rectangle_135_light_blue.png'
import beAwareLogo from './src/img/logo-dark-removebg-preview 1.png'
import deleteUserProfile from './src/img/delete_user_profile.png'
import deleteProfileLogo from './src/img/deleteProfilelogo.png'

import { useNavigate } from 'react-router-dom';
import { auth } from '../LoginSignUp/firebase';

const DeleteProfileCnfComponent = () => {
    const navigate = useNavigate();

    const redirectToDeleteProfile = () => {
        // console.log('Yes, Delete button is clicked')
        // window.location.href = '/deleteprofile';
        // firebase.auth().currentUser.delete()
        navigate('/deleteprofile');

    };

    const redirectToDashboard = () => {
        // console.log('Cancel button is clicked')
        // window.location.href = '/dashboard';
        navigate('/dashboard');
    };


    return (
        <div>
            <div id="deletePrfoileCnf">

                <div id="deletePrfoileCnfTopbar">
                    <img src={beAwareLogo} alt="BeAware Logo" id="bewareLogo"/>
                    {/* <img src={rectangle135} alt="Rectangle 135.png" className="centered-image" /> */}
                    <img src={rectangle135} alt="Rectangle 135.png" id="rectangle135" />
                </div>

                <div id="deletePrfoileCnfMain">
                    <h2>Delete Your Account</h2>
                    <br/>
                    <p>Are you sure that you want to delete your account? if you delete your account all your data will be wiped out.</p>
                    <p>Are you absolutely sure you want to proceed?</p>
                    {/* <img src={deleteUserProfile} alt="delete profile img" /> */}
                    <img src={deleteProfileLogo} alt="delete profile img"/>

                    <div id="deletePrfoileCnfBtn">
                        <table>
                            <tr>
                                <td id="deletePrfoileYesBtn">
                                    <button onClick={redirectToDeleteProfile}>Yes, Delete</button>
                                </td>
                                {/* <td>&#160;</td> */}
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