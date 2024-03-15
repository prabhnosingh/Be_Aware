import React from 'react';
import './dashboard-style.css';
// import './test.css'
 
import bewareLogo from './src/img/beaware.png'
import Apng from './src/img/A.png';
import GenerateStreamIcon from './src/img/Generate Stream Icon.png';
import UndrawBusinessman from './src/img/undraw_businessman_e7v0.svg';
import DashboardLeftPic from './src/img/dashboardleft.png';
import Vector from './src/img/Vector.svg'
import DashboardPic from './src/img/dashboard.png'
 
const Username = "Username"
const Dashboard = () => {
  return (
    <div id="dashboardMain">
      <div id="topBar">
        <img src={bewareLogo} alt="beaware logo" />
        <button>Sign Out</button>
      </div>
 
      <div id="main">
        <div id="left">
          {/* <img src={UndrawBusinessman} alt="UndrawBusinessman"/> */}
          <img src={DashboardLeftPic} alt="DashboardLeftPic"/>
        </div>
 
        <div id="mid">
          <div id="container1">
          <h1 style={{ fontSize: '40px', fontFamily: "Poppins, sans-serif" }}>Welcome {Username}!</h1>
 
            {/* <h1 style={{fontSize:'40px', fontFamily: 'Algeria', sans-serif}}>Dashboard</h1> */}
 
            {/* <div id="container12">
              <img src={Apng} alt="Profile Initials" />
            </div> */}
            <h4 style={{marginTop:'2px', fontSize:'20px'}}>username_abc</h4>
            <h4 style={{marginTop:'2px', fontSize:'20px'}}>abc@example.com</h4>
          </div>
 
          <div id="container2">
            <p style={{ fontSize: '30px', fontFamily: 'Poppins, sans-serif', margin:'2px', fontWeight:'bold' }}>
              Stream information:<br />
              {/* Color : Sandy Beach Sade<br />
              Logo url : https://logo.com */}
              <div id="container2ColorInfo">
                Color : Sandy Beach Sade
              </div>
              <div id="container2LogoInfo">
                Logo url : https://logo.com
              </div>
            </p>
          </div>
          <br />
 
          <div id="container3">
          {/* <img src={GenerateStreamIcon} alt="Generate Stream Icon" /> */}
          <br />
          <a href="https://www.google.com">Click to generate Stream</a>
          </div>
          <br />
          <div id="editDeleteBtn">
          <table>
            <tr>
            <button>Edit Profile</button>
            <text>&#160;</text>
            <button>Delete Profile</button>
            </tr>
          </table>
            {/* <button>Edit Profile</button>
            <br />
            <button>Delete Profile</button> */}
          </div>
        </div>
 
        <div id="rightImg">
          <img src={DashboardPic}/>
          
        </div>
      </div>
      <div id="footer">
        <p>&copy; 2024 BeAware. All rights reserved.</p>
      </div>
 
     
    </div>
 
  );
};
 
export default Dashboard;