import React, { useState, useEffect } from 'react';
import './dashboard-style.css';
import bewareLogo from './src/img/beaware.png';
import DashboardLeftPic from './src/img/dashboardleft.png';
import Vector from './src/img/Vector.svg'
import DashboardPic from './src/img/dashboard.png'
import {Link, useNavigate} from 'react-router-dom'
import { firebaseApp } from '../../firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css'; 
const Username = "Username"

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const location = useLocation(); // Get the location object
  
  const wateryKeyframes = `
  @keyframes watery {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

// Create a <style> tag and insert the keyframes animation
const styleTag2 = document.createElement('style');
styleTag2.innerHTML = wateryKeyframes;
document.head.appendChild(styleTag2);
  function showAlert() {
    if(localStorage.getItem("alert")=="yes"){
    Swal.fire({
      title: 'Hey there! 👋',
      text: ' BE AWARE.',
      imageUrl: 'https://www.bing.com/th/id/OGC.5e78affab2547d678e4c5458dd931381?pid=1.7&rurl=https%3a%2f%2fcdn.dribbble.com%2fusers%2f27231%2fscreenshots%2f2432051%2fwelcome.gif&ehk=F3rxBE9ife3EOU14rTWOPJg6yzVIbVZB0VGWLQ0GVmo%3d',
      imageWidth: 400, 
      imageHeight: 300,
      confirmButtonText: 'Close',
      allowOutsideClick: false, 
      allowEscapeKey: false,
      animation: wateryKeyframes,
      // grow: 'row',
      showConfirmButton: false,
      // showCloseButton: true,
    });
    localStorage.setItem("alert","no");
  }
  }

  useEffect(() => {
    const currentUser = firebaseApp.auth().currentUser;
    showAlert();
    if (currentUser) {
      // Fetch user data from Firestore
      const userRef = firebaseApp.firestore().collection('users').doc(currentUser.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userDataFromFirestore = doc.data();
          setUserData(userDataFromFirestore);
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.error('Error getting document:', error);
      });
    }
  }, []); // Fetch data only once on component mount




  const handleDeleteClick = () => {
    // Redirect to the email page
    navigate('/deleteprofileConfirmation');
  };

  const handleProfileClick = () => {
    // Redirect to the email page
    // navigate('/editprofile');
    navigate('/editpassword', { state: { userData: userData } });
  };

  const handleSignOut = () => {
    firebaseApp.auth().signOut()
      .then(() => {
        // Handle successful sign-out
        console.log("User signed out successfully");
        navigate('/');
        localStorage.removeItem("userData");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("alert");
        // Optionally, delete the key from user data
        // Assuming you have access to user data and a function to delete the key
        // Example: deleteUserKeyFromData(user.uid);
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Error signing out:", error);
      });
  };

  setTimeout(function() {
    Swal.close();
  }, 4000); // 10000 milliseconds = 10 seconds


  useEffect(() => {
    // componentDidMount();
    const data= localStorage.getItem("currentUser");
    const currentUser = firebaseApp.auth().currentUser;
    const localID=JSON.parse(data).uid;
    if (currentUser!=null||localID!=null) {
      // Fetch user data from Firestore
      const userRef = firebaseApp.firestore().collection('users').doc(currentUser!=null?currentUser.uid:localID.toString());
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userDataFromFirestore = doc.data();
          console.log("here");
          setUserData(userDataFromFirestore);
        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.error('Error getting document:', error);
      });
    }
    // Swal.close();
  }, []);

  // const handleProfileClick = () => {
  //   // Redirect to the email page
  //   // navigate('/editprofile');
  //   navigate('/editprofile', { state: { userData: userData } });
  // };

  // const handleDeleteClick = () => {
  //   // Redirect to the email page
  //   navigate('/deleteprofileConfirmation');
  // };

  // const handleSignOut = () => {
  //   firebaseApp.auth().signOut()
  //     .then(() => {
  //       // Handle successful sign-out
  //       console.log("User signed out successfully");
  //       navigate('/');
  //       localStorage.removeItem("userData");
  //       localStorage.removeItem("currentUser");
 
  //       // Optionally, delete the key from user data
  //       // Assuming you have access to user data and a function to delete the key
  //       // Example: deleteUserKeyFromData(user.uid);
  //     })
      // .catch((error) => {
  //       // Handle sign-out errors
  //       console.error("Error signing out:", error);
  //     });
  // };


  return (
    <div id="dashboardMain">
      <div id="topBar">
        <img src={bewareLogo} alt="beaware logo" />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <div id="main">
        <div id="left">
          {/* <img src={UndrawBusinessman} alt="UndrawBusinessman"/> */}
          <img src={DashboardLeftPic} alt="DashboardLeftPic" />
        </div>

        <div id="mid">
          <div id="container1">
            <h1 style={{ fontSize: '40px', fontFamily: "Poppins, sans-serif" }}>Welcome </h1>
            <h4 style={{ marginTop: '2px', fontSize: '20px' }}> User Email : {userData ? userData.email ?? "" : ""}</h4>
          </div>

          <div id="container2">
            <p style={{ fontSize: '30px', fontFamily: 'Poppins, sans-serif', margin: '2px', fontWeight: 'bold' }}>
              <strong>STREAM INFORMATION:<br /></strong>
              Stream Name : {userData ? userData.username ?? "" : ""}! <br />
              Color: {userData ? userData.color : ""}<br />
              Logo url: <a href={ userData ? userData.url : "#"}>{userData ? userData.url.length<10? userData.url: userData.url.toString().substring(0,17)+"..." ?? "" : ""}</a>
            </p>
          </div>

          <div id="container3">
            <br />
            <a href="/stream">Click to generate Stream</a>
          </div>
          <br />
          <div id="editDeleteBtn">
            <table>
              <tbody>
                <td>
                <tr>
                <button onClick={handleProfileClick}>Edit Profile</button>
                <button onClick={handleDeleteClick}>Delete Profile</button>
              </tr>
                </td>
              </tbody>
            </table>
          </div>
        </div>

        <div id="rightImg">
          <img src={DashboardPic} />
        </div>
      </div>
      <div id="footer">
        <p>&copy; 2024 BeAware. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;