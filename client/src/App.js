import React from 'react';
import './style.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stream from './pages/Stream';


import { useState } from 'react';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';
import SignInSignUpForm from './components/LoginSignUp/loginSignUp'
import Dashboard from './components/dashboard/dashboard';
import ForgotPassword from './components/forgotPassword/forgotPassword'
import SetPassword from './components/forgotPassword/setPassword'

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

            </Routes>
        </Router>

      </div>
    );
  }
  
  export default App;