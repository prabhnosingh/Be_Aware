// 
import React from 'react';
import styles from "./BaseFrame.module.css";
import { Link } from 'react-router-dom'; // Import Link component from React Router
import { blueGrey } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { firebaseApp } from './LoginSignUp/firebase';

const BaseFrame = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch userData from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  console.log("#############");
  console.log(firebaseApp.auth().currentUser);
  return (
    <div className={styles.baseFrame} style={{backgroundColor:userData?userData.color:blueGrey}}>
      <div className={styles.frameParent} style={{backgroundColor:userData?userData.color:blueGrey}}>
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
        <div className={styles.screenshotBox} style={{backgroundColor:userData?userData.color:blueGrey}}>
          <div className={styles.screenshotBoxChild} style={{backgroundColor:userData?userData.color:blueGrey}}/>
          <img
            className={styles.screenshot20240208At650}
            style={{color:userData?userData.color:blueGrey}}
            loading="eager"
            alt=""
            src="/imageslogo.png"
          />
          <h3 className={styles.letsConnectVia} style={{backgroundColor:userData?userData.color:blueGrey}}>
            Let’s Connect via Live Stream !
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BaseFrame;
