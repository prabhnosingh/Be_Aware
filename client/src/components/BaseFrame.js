// 
import React from 'react';
import styles from "./BaseFrame.module.css";
import { Link } from 'react-router-dom'; // Import Link component from React Router

const BaseFrame = () => {
  return (
    <div className={styles.baseFrame}>
      <div className={styles.frameParent}>
        <div className={styles.logoRemoveBgPreviewWrapper}>
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
        <div className={styles.screenshotBox}>
          <div className={styles.screenshotBoxChild} />
          <img
            className={styles.screenshot20240208At650}
            loading="eager"
            alt=""
            src="/imageslogo.png"
          />
          <h3 className={styles.letsConnectVia}>
            Let’s Connect via Live Stream !
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BaseFrame;
