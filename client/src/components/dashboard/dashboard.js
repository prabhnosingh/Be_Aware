import React, { useState, useEffect } from 'react';
import './dashboard-style.css';
import bewareLogo from './src/img/beaware.png';
import DashboardLeftPic from './src/img/dashboardleft.png';
import DashboardPic from './src/img/dashboard.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { firebaseApp } from '../../firebase'; // Import your Firebase configuration

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const location = useLocation(); // Get the location object

  useEffect(() => {
    const currentUser = firebaseApp.auth().currentUser;

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
 
        // Optionally, delete the key from user data
        // Assuming you have access to user data and a function to delete the key
        // Example: deleteUserKeyFromData(user.uid);
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Error signing out:", error);
      });
  };


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
              Logo url:<span className="small-font">{" "}
<a href={userData ? userData.url : "#"}>
  {userData ? userData.url ?? "" : ""}
</a></span>
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
