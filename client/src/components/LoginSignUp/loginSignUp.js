import React, { useState } from 'react';
import './style.css';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';
import { useLocation } from 'react-router-dom';
import {firebaseApp} from './firebase.js';
import {Link} from 'react-router-dom'
import {   HuePicker } from 'react-color'
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// import 'firebase/firestore';
 
function SignInSignUpForm() {
  const location = useLocation();
  // const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(location.state ? location.state.isSignUpMode : false);
  const [modalOpen, setModalOpen] = useState(false);
  const [background, setBackground] = useState('#fff');
  const navigate = useNavigate(); // Access the navigate function

  const handleSignUpMode = async () => {
    setIsSignUpMode(true);
  };

  const showSwal2 = () => {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didClose: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    }
  var b=true;
 
  const SignUpHit = async (e) => {
    e.preventDefault();
    showSwal2();
    // event.preventDefault(); // Prevent form submission
    console.log("hello");
 
    // Get form values
    const username = document.getElementById('username1').value;
    const email = document.getElementById('email1').value.trim();
    const password = document.getElementById('password1').value;
    const color =background;
    const url = document.getElementById('url').value;
    console.log("hello");
    console.log(email);
    try {
      // Create user in Firebase Authentication
      const userCredential = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
 
      // Add user details to Firestore collection
      await firebaseApp.firestore().collection("users").doc(user.uid).set({
        username: username,
        email: email,
        color: color,
        url: url                
      });
 
      // Set sign up mode to true
      //setIsSignUpMode(true);
 
      console.log("User created successfully!");
      // Swal.close();
      setInputValue2("User created successfully!");
      showSwal3();
      // Swal.close();
    } catch (error) {
      Swal.close();
      setInputValue(error.message);
      showSwal();
      console.error("Error creating user:", error.message);
    }
  }
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const [inputValue, setInputValue] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const showSwal = () => {
    if(inputValue!=''){
    withReactContent(Swal).fire({
      icon:"error",
      confirmButtonColor:"red",
      title: <i>{inputValue}</i>,
      // input: 'text',
      // inputValue,
      // preConfirm: () => {
      //   setInputValue(Swal.getInput()?.value || '')
      // },
    })
  }
  }

  const showSwal3 = () => {
    if(inputValue2!=''){
    withReactContent(Swal).fire({
      icon:"success",
      confirmButtonColor:"red",
      title: <i>{inputValue2}</i>,
      // input: 'text',
      // inputValue,
      // preConfirm: () => {
      //   setInputValue(Swal.getInput()?.value || '')
      // },
    })
  }
  }

  const loginHit = async (e) => {
    e.preventDefault();
    b=false;
    showSwal2();
    const username = document.getElementById("username").value;
    console.log(username);
    const password = document.getElementById("password").value;
    console.log(password);
    //const navigate = useNavigate(); // Access the navigate function
 
 
    try {
      // Sign in user with email and password
      const userCredential = await firebaseApp.auth().signInWithEmailAndPassword(username, password);
      const currentUser = firebaseApp.auth().currentUser;
      console.log(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log("after here");
      if (currentUser) {
        // Access the user's document in the "users" collection
        const userCollectionRef = firebaseApp.firestore().collection("users");
        const userDoc = await userCollectionRef.doc(currentUser.uid).get();
        console.log("##########current user####");
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
          console.log(userCredential.user.displayName)
          console.log("User logged in successfully:", userCredential.user);
          navigate('/dashboard');
        } else {
          Swal.close();
          setInputValue("No user data found in local storage.");
          showSwal();
          showSwal();
          console.log("No user data found in local storage.");
        }
        } else {
          Swal.close();
          setInputValue("User document does not exist.");
          showSwal();
          showSwal();
          console.log("User document does not exist.");
        }
      } else {
        Swal.close();
        setInputValue("No user is currently signed in.");
        showSwal();
        showSwal();
        console.log("No user is currently signed in.");
      }
    } catch (error) {
      Swal.close();
      setInputValue(error.message);
      showSwal();
      console.log(inputValue);
      // setModalOpen(true);
      // Handle login errors
      console.error("Error logging in:", error.message);
    }
  }
  


  const handleSignInMode = () => {
    setIsSignUpMode(false);
  };
  const [metaTagsAdded, setMetaTagsAdded] = useState(false);
  const addNoCacheMetaTags = () => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(meta);

    const meta2 = document.createElement('meta');
    meta2.httpEquiv = 'Pragma';
    meta2.content = 'no-cache';
    document.head.appendChild(meta2);

    const meta3 = document.createElement('meta');
    meta3.httpEquiv = 'Expires';
    meta3.content = '0';
    document.head.appendChild(meta3);
  };

  // Call addNoCacheMetaTags when component mounts
  React.useEffect(() => {
    console.log("error occured outer");
    if (!metaTagsAdded && b==false) {
      console.log("error occured inside");
      addNoCacheMetaTags();
      addNoCacheMetaTags();
      setMetaTagsAdded(true);
      console.log("I am inside metaTags");
    }
    showSwal();
    if(inputValue2!=''){
      showSwal3();
    }
    // addNoCacheMetaTags();
  }, [metaTagsAdded, inputValue]);

  

  return (
    <div className={isSignUpMode ? "container sign-up-mode" : "container"}>
      <div className="forms-container">
        <div className="signin-signup">
 
 
          <form action="#" className="sign-in-form">
            <img src={logo} className="image-logo" alt="Logo" />
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" id='username'autoComplete="off"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" id='password'autoComplete="off"/>
            </div>
            <input type="button" value="Login" className="btn solid" onClick={loginHit}/>
            <Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
 
          </form>
 
 
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" id='username1'autoComplete="off"/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" id='email1'autoComplete="off"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" id='password1'autoComplete="off"/>
            </div>
           
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="url" placeholder="URL" id='url'autoComplete="off"/>
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
            <p>
              Join BeAware Communtiy
            </p>
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
      {/* <Modal isOpen={modalOpen} message={errorMessage} onClose={handleCloseModal} /> */}
    </div>
  );
}
 
export default SignInSignUpForm;