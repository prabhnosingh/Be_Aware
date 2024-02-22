import React from 'react';
import './style.css'; // Import your CSS file
import { useState } from 'react';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';



function SignInSignUpForm() {

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpMode = () => {
    setIsSignUpMode(true);

  };
  const handleSignInMode = () => {
    setIsSignUpMode(false);

  };



  return (
    <div className={isSignUpMode ? "container sign-up-mode" : "container"}>
      <div className="forms-container">
        <div className="signin-signup">
        
          <form action="#" className="sign-in-form">
          <img 
        src={logo} 
        className="image-logo" 
        alt="" 
        style={{ position: 'absolute', top: '0px', height: '100px',  width: '350px',  right: '30px' }} 
      />
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
        
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              {/* <FontAwesomeIcon icon={faCoffee} /> */}
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="color" placeholder="Color" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="url" placeholder="URL" />
            </div>

            <input type="submit" className="btn" value="Sign up"/>
            
    
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={() => {handleSignUpMode()}}>
              Sign up
            </button>
          </div>
     
          <img src={logImage} className="image" alt="" />
         

        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={() => {handleSignInMode()}}>
              Sign in
            </button>
          </div>
          
          <img src={regImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignInSignUpForm;
