import React from 'react';
import './dashboard-style.css';

import bewareLogo from './src/img/beaware.png'
import Apng from './src/img/A.png';
import GenerateStreamIcon from './src/img/Generate Stream Icon.png';
import UndrawBusinessman from './src/img/undraw_businessman_e7v0.svg';
import Vector from './src/img/Vector.svg'

const Dashboard = () => {
  return (
    <div id="dashboardMain">
      <div id="topBar">
        <img src={bewareLogo} alt="beaware logo" />
        <button>Sign Out</button>
      </div>

      <div id="main">
        <div id="left">
          <img src={UndrawBusinessman} alt="UndrawBusinessman"/>
        </div>

        <div id="mid">
          <div id="container1">
            <h2>Dashboard</h2>

            <div id="container12">
              <img src={Apng} alt="Profile Initials" />
            </div>
            <h4>abc@example.com</h4>
          </div>

          <div id="container2">
            <p>
              Stream information:<br />
              Color : Sandy Beach Sade<br />
              Logo url : https://logo.com
            </p>
          </div>
          <br />

          <div id="container3">
          <img src={GenerateStreamIcon} alt="Generate Stream Icon" />
          <br />
          <a href="https://www.google.com">Click to generate Stream</a>
          </div>

          <br />

          <div id="editDeleteBtn">
            <button>Edit Profile</button>
            <br />
            <button>Delete Profile</button>
          </div>
        </div>

        <div id="right">
          <img src={Vector} alt="vector"/>
        </div>
      </div>

      
    </div>

  );
};

export default Dashboard;