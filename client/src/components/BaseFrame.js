//************************************** Header code changes



import React from 'react';
import styles from "./BaseFrame.module.css";
import { Link } from 'react-router-dom'; // Import Link component from React Router
import { blue, blueGrey, red } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { firebaseApp } from './LoginSignUp/firebase';
 
const BaseFrame = () => {
  const [userData, setUserData] = useState(null);
  // var backgroundColor = userData ? userData.color : '#FFFFFF';
  
  // var textColor =  textColor = getContrastColor(backgroundColor);
  const [backgroundColor, setBackgroundColor] = useState(''); // Initialize background color state
  const [textColor, setTextColor] = useState('#000000'); // Initialize te
 
 
  // useEffect(() => {
  //   // Fetch userData from localStorage when component mounts
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     setUserData(JSON.parse(storedUserData));
  //   }
  //   backgroundColor = userData ? userData.color : '#FF0000';
  //   textColor = getContrastColor(backgroundColor);
    
  // }, []);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = firebaseApp.auth().currentUser;
        if (!currentUser) {
          // If currentUser is null, wait for the authentication state to change
          firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, fetch user data
              fetchUserData();
            } else {
              // User is signed out, handle accordingly
            }
          });
          return;
        }

        const storedUserData = firebaseApp.firestore().collection('users').doc(currentUser.uid);
        const doc = await storedUserData.get();
        
        if (doc.exists) {
          const userDataFromFirestore = doc.data();
          setUserData(userDataFromFirestore);
          const backgroundColor = userDataFromFirestore ? userDataFromFirestore.color : '#FF0000';
          setBackgroundColor(backgroundColor);
          setTextColor(getContrastColor(backgroundColor));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

  }, []);
 
 
 
  console.log("#############");
 
  console.log(firebaseApp.auth().currentUser);



function getContrastColor(hexColor) {
  // Convert hex color to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Decide on the contrasting text color
  return luminance > 0.5 ? 'black' : 'white';
}


// useEffect(() => {

// const backgroundColor = userData ? userData.color : '#000000';
// const backgroundColor = userData ? userData.color : '#FFFFFF';
// backgroundColor = userData ? userData.color : '#FF0000';

// const backgroundColor = userData ? userData.color : '#1B4375'; //bluegrey
// const backgroundColor = userData ? userData.color : '#FFFF00';//yellow
//  textColor = getContrastColor(backgroundColor);
// const textColor = 'black';
// }, []); // Fetch data only once on component mount

  return (
    <div className={styles.baseFrame} 
    // style={{backgroundColor:userData?userData.color:blueGrey}}
    style={{backgroundColor:backgroundColor, color: textColor}}

    >
      <div className={styles.frameParent} 
      style={{backgroundColor:'#FFEECB'}}
      // style={{backgroundColor:backgroundColor, color: textColor}}
      >
      
        <div className={styles.logoRemoveBgPreviewWrapper} >
          <header className={styles.logoRemoveBgPreview}>
            {/* Wrap the home button with Link */}
            <Link to="/dashboard">
              <img
                className={styles.logoDarkRemovebgPreview1Icon}
                loading="eager"
                alt=""
                src="/logodarkremovebgpreview-1@2x.png"
              />
            </Link>
            <div className={styles.homeBackButton}>
  <Link to="/dashboard">
    <button>Home</button>
  </Link>
             
            </div>
          </header>
        </div>
        <div className={styles.screenshotBox} 
        // style={{backgroundColor:userData?userData.color:blueGrey}}
        // style={{backgroundColor:'red'}}
        style={{backgroundColor:backgroundColor, color: textColor}}

        >
          <div className={styles.screenshotBoxChild} 
          style={{backgroundColor:userData?userData.color:blueGrey}}
          // style={{backgroundColor:backgroundColor, color: textColor}}
          // style={{backgroundColor:'red'}}
          />
          <img
            className={styles.screenshot20240208At650}
            // style={{color:userData?userData.color:blueGrey}}
            style={{backgroundColor:backgroundColor, color: textColor}}
            loading="eager"
            alt=""
            src="/imageslogo.png"
            // src= {userData.url}
          />
          <h3 
          className={styles.letsConnectVia} 
          // style={{backgroundColor:userData?userData.color:blueGrey}}
          style={{backgroundColor:backgroundColor, color: textColor}}
          
          >
            Let’s Connect via Live Stream !
          </h3>
        </div>
      </div>
    </div>
  );
};
 
export default BaseFrame;