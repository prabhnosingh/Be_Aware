import React from 'react';
import './deletprofile-style.css'; // Import your CSS file


import rectangle135 from './src/img/Rectangle 135.png'
import beAwareLogo from './src/img/logo-dark-removebg-preview 1.png'
import deleteMsgLogo from './src/img/undraw_throw_away_re_x60k 1.png'

const DeleteProfileComponent = () => {
    return (
        <div>
               <div id="deletePrfoileTopbar">
               <img src={beAwareLogo} alt="BeAware Logo" id="bewareLogo"/>
                    {/* <img src={rectangle135} alt="Rectangle 135.png" className="centered-image" /> */}
                    <img src={rectangle135} alt="Rectangle 135.png"  id="rectangle135"/>
                </div>
                <div id="deletePrfoileMain">
                    <img src={deleteMsgLogo} alt="delete msg logo" />
                    <br/>
                    <br/>
                    <h3>Your account is deleted successfully</h3>
                </div>
        </div>
    );
}

export default DeleteProfileComponent;