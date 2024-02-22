import React from 'react';
import './style.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateStudent from './components/createStudent/createStudent'

import { useState } from 'react';
import logImage from './img/log.svg';
import regImage from './img/register.svg';
import logo from './img/beaware_logo.png';
import SignInSignUpForm from './components/LoginSignUp/loginSignUp'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';





  function App() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignInSignUpForm />} />
            
            </Routes>
        </Router>

      </div>
    );
  }
  
  export default App;