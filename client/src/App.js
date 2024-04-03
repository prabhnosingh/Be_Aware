import React from 'react';
import './style.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stream from './pages/Stream';
import SpeechToText from './components/SpeechToText/speech';
import Manual from './components/manual/manual'

import { useState } from 'react';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';
import SignInSignUpForm from './components/LoginSignUp/loginSignUp'
import Dashboard from './components/dashboard/dashboard';
import ForgotPassword from './components/forgotPassword/forgotPassword'
import SetPassword from './components/forgotPassword/setPassword'

// import DeleteProfileCnfComponent from './components/deleteProfileCnf/deleteProfileC';
import DeleteProfileCnfComponent from './components/deleteProfileCnf/deleteProfileCnf';
import DeleteProfileComponent from './components/deleteProfile/deleteProfile';

import EditProfilePage from './components/editprofile/emailChange';
import EditPasswordPage from './components/editprofile/editpassword/editPassword';
import EditStreamPage from './components/editprofile/editstream/editStream';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';


  function App() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignInSignUpForm />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/stream" element={<Stream/>} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/setpassword" element={<SetPassword/>} />
            <Route path="/deleteprofileConfirmation" element={<DeleteProfileCnfComponent/>} />
            <Route path="/deleteprofile" element={<DeleteProfileComponent/>} />
            <Route path="/editprofile" element={<EditProfilePage/>}/>
            <Route path="/editpassword" element={<EditPasswordPage/>}/>
            <Route path="/editstream" element={<EditStreamPage/>}/>
            <Route path='/speechtotext' element={<SpeechToText/>} />
            <Route path="/manual" element={<Manual/>}/>
            </Routes>
        </Router>

      </div>
    );
  }
  
  export default App;