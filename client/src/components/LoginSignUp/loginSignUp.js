import React, { useState } from 'react';
import './style.css';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';
import {firebaseApp} from './firebase.js';
import { Link } from 'react-router-dom';
import { HuePicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function SignInSignUpForm() {
  const location = useLocation();
  // const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(location.state ? location.state.isSignUpMode : false);
  const [background, setBackground] = useState('#fff');
  const [hexCode, setHexCode] = useState('#fff');
  const navigate = useNavigate();
 
  const handleSignUpMode = async () => {
    setIsSignUpMode(true);
  };
  const SignUpHit = async () => {
    // event.preventDefault(); // Prevent form submission
    //console.log("hello");
    // Get form values
    const username = document.getElementById('username1').value;
    const email = document.getElementById('email1').value.trim();
    const password = document.getElementById('password1').value;
    const color = document.getElementById('hexcode').value;
    const url = document.getElementById('url').value;
    console.log(email);
    try {
      // Create user in Firebase Authentication
      console.log('adding in auth')
      const userCredential = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      console.log('cred....',userCredential)
      const user = userCredential.user;
      console.log(user)
      // Add user details to Firestore collection
      await firebaseApp.firestore().collection("users").doc(user.uid).set({
        username: username,
        email: email,
        color: color,
        url: url                
      });
      console.log('adding in coll')

 
      // Set sign up mode to true
      //setIsSignUpMode(true);
      setIsSignUpMode(false)
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
 
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
    setHexCode(color.hex);
  };
 
  const handleHexCodeChange = (event) => {
    const newHexCode = event.target.value;
    setHexCode(newHexCode);
    setBackground(newHexCode);
  };
 
  const loginHit = async () => {
    const username = document.getElementById("username").value;
    console.log(username);
    const password = document.getElementById("password").value;
    console.log(password);
    //const navigate = useNavigate(); // Access the navigate function
 
    try {
      // Sign in user with email and password
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(username, password);
      console.log('user cred...',userCredential)
      const currentUser = firebaseApp.auth().currentUser;
      if (currentUser) {
        // Access the user's document in the "users" collection
        const userCollectionRef = firebaseApp.firestore().collection("users");
        const userDoc = await userCollectionRef.doc(currentUser.uid).get();
        if (userDoc.exists) {
          // Access data of the user
          const userData = userDoc.data();
          console.log("User data:", userData);
          // Save user data to local storage
          localStorage.setItem("userData", JSON.stringify(userData));
          const storedUserData = localStorage.getItem("userData");
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            console.log("Retrieved user data:", userData);
          } else {
            console.log("No user data found in local storage.");
          }
        } else {
          console.log("User document does not exist.");
        }
      } else {
        console.log("No user is currently signed in.");
      }
      console.log(userCredential.user.displayName)
      console.log("User logged in successfully:", userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      // Handle login errors
      console.error("Error logging in:", error.message);
    }
  }
 
  const handleSignInMode = () => {
    setIsSignUpMode(false);
  };
 
  return (
<div className={isSignUpMode ? "container sign-up-mode" : "container"}>
<div className="forms-container">
<div className="signin-signup">
<form action="#" className="sign-in-form">
<img src={logo} className="image-logo" alt="Logo" />
<h2 className="title">Sign in</h2>
<div className="input-field">
<i className="fas fa-user"></i>
<input type="text" placeholder="Username" id='username'/>
</div>
<div className="input-field">
<i className="fas fa-lock"></i>
<input type="password" placeholder="Password" id='password'/>
</div>
<input type="submit" value="Login" className="btn solid" onClick={loginHit}/>
<Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
</form>
<form action="#" className="sign-up-form">
<h2 className="title">Sign up</h2>
<div className="input-field">
<i className="fas fa-user"></i>
<input type="text" placeholder="Stream name" id='username1'/>
</div>
<div className="input-field">
<i className="fas fa-envelope"></i>
<input type="email" placeholder="Email" id='email1'/>
</div>
<div className="input-field">
<i className="fas fa-lock"></i>
<input type="password" placeholder="Password" id='password1'/>
</div>
<div className="input-field">
<i className="fas fa-user"></i>
<input type="url" placeholder="Image URL" id='url'/>
</div>
<div className="input-field">
<i className="fas fa-user"></i>
<input 
                type="text" 
                id="hexcode" 
                value={hexCode} 
                onChange={handleHexCodeChange} 
              />
</div>
<div className="colorfield">
<HuePicker color={background} onChangeComplete={handleChangeComplete} />
</div>
<input type="submit" className="btn" value="Sign up" onClick={SignUpHit}/>
</form>
</div>
</div>
<div className="panels-container">
<div className="panel left-panel">
<div className="content">
<h3>New here ?</h3>
<p>Join BeAware Community</p>
<button className="btn transparent" id="sign-up-btn" onClick={handleSignUpMode}>
              Sign up
</button>
</div>
<img src={logImage} className="image" alt="Sign in" />
</div>
<div className="panel right-panel">
<div className="content">
<h3>One of us ?</h3>
<br></br>
<button className="btn transparent" id="sign-in-btn" onClick={handleSignInMode}>
              Sign in
</button>
</div>
<img src={regImage} className="image" alt="Sign up" />
</div>
</div>
</div>
  );
}
export default SignInSignUpForm;