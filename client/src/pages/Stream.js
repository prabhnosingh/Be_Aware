//************************************** Body color changes behind the images */


import React from 'react';
import BaseFrame from '../components/BaseFrame';
import styles from './Stream.module.css';
import firebase from 'firebase/compat/app'; // Import the Firebase App module
import 'firebase/compat/database';
import { useState, useEffect } from 'react';
// import { firebaseApp } from '../../firebase'; // Import your Firebase configuration
import { firebaseApp } from '../firebase';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { blueGrey, red } from '@material-ui/core/colors';
 
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
 
const Stream = () => {
  const [userData, setUserData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  // const [textColor, setTextColor] = useState(null);
  // const [backgroundColor, setBackgroundColor] = useState(() => {
  //   // Initialize background color from local storage or default to white
  //   return localStorage.getItem('backgroundColor') || '#FFFFFF';
  // });

  const [textColor, setTextColor] = useState(() => {
    // Initialize text color based on the background color
    return getContrastColor(backgroundColor);
  });


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
 







  const [openInstructions, setOpenInstructions] = React.useState(false);
 
  const handleClickOpenInstructions = () => {
    setOpenInstructions(true);
  };
 
  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  };
 
  const [openURL, setOpenURL] = React.useState(false);
 
  const handleClickOpenURL = () => {
    setOpenURL(true);
  };
 
  const handleCloseURL = () => {
    setOpenURL(false);
  };
 
  const handleDownloadPDF = () => {
    // Construct the URL of the PDF file stored in the public folder
    const pdfUrl = process.env.PUBLIC_URL + '/streampdf.pdf';
    // Trigger the download of the PDF file
    window.open(pdfUrl, '_blank');
  };

  
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
  
//  setBackgroundColor(userData ? userData.color : '#FF0000');
//   setTextColor(getContrastColor(backgroundColor));


// useEffect(() => {
// // const backgroundColor = userData ? userData.color : '#000000';
//  backgroundColor = userData ? userData.color : '#FF0000';

// // const backgroundColor = userData ? userData.color : '#FFFFFF';
// // const backgroundColor = userData ? userData.color : '#1B4375'; //greyblue
// // const backgroundColor = userData ? userData.color : '#FFFF00'; //yellow
//   textColor = getContrastColor(backgroundColor);
// // const textColor = 'black';
// }, []); // Fetch data only once on component mount

 
  return (
    <>
    <div>
    <div className={styles.stream}>
      <BaseFrame />
      <div className={styles.uRLInstructionFrame}>
        <main className={styles.instructionsFrame} >
          <section className={styles.leftSection} >
            <img
              className={styles.qrCodeIcon}
              loading="eager"
              alt=""
              src="/qr-code.png"
            />
            <b
              className={styles.scanTheCode}
            >{`Scan the Code & be a part of the stream. We are waiting for you....`}</b>
            <div className={styles.instructionsButtonsContainer} >
              <button
                className={styles.linkInstructions}
                onClick={handleClickOpenInstructions}
                style={{backgroundColor:backgroundColor, color: textColor}}
              >
                <div className={styles.linkInstructionsChild} />
                <b className={styles.instructions}>{`Instructions `}</b>
              </button>
              <button className={styles.linkInstructions1} onClick={handleClickOpenURL} 
              style={{backgroundColor:backgroundColor, color:textColor}}
              // style={{backgroundColor:red}}
              >
                <div className={styles.linkInstructionsItem} />
                <b 
                className={styles.url}
                // style={{backgroundColor:'red'}}
                >URL</b>
              </button>
            </div>
          </section>
          <section className={styles.rightSection} style={{backgroundColor:backgroundColor, marginLeft:'200px'}}>
            <img
              className={styles.onlineConnectionImageChild}
              loading="eager"
              
              alt=""
              src="/group-46.svg"
            />
            <img
              className={styles.undrawOnlineConnection6778Icon}
              backgroundColor='red'
              alt=""
              src="/undraw-online-connection-6778-1.svg"
            />
          </section>
        </main>
      </div>
      <React.Fragment key="intructionsDialog">
        <BootstrapDialog
          onClose={handleCloseInstructions}
          aria-labelledby="customized-dialog-title"
          open={openInstructions}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Instructions
          </DialogTitle>
          <button
            aria-label="close"
            onClick={handleCloseInstructions}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              padding: '10px',
              height: '50px',
              width: '50px',
              verticalAlign: 'middle',
            }}
          >
            <CloseIcon />
          </button>
          <DialogContent dividers>
            <Typography gutterBottom>
              Scan the provided QR code with your smartphone or tablet using a
              QR code scanner app. Once scanned, you will be directed to the
              streaming platform to access the stream. Enjoy the content and
              participate in the discussion or activities as directed by the
              hosts. If you encounter any issues, refer to the troubleshooting
              guide or contact support for assistance.
            </Typography>
            <Button variant="contained" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Save changes
            </Button> */}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
 
      <React.Fragment key="URLDialog">
        <BootstrapDialog
          onClose={handleCloseURL}
          aria-labelledby="customized-dialog-title"
          open={openURL}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            URL
          </DialogTitle>
          <button
            aria-label="close"
            onClick={handleCloseURL}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              padding: '10px',
              height: '50px',
              width: '50px',
              verticalAlign: 'middle',
            }}
          >
            <CloseIcon />
          </button>
          <DialogContent dividers>
            <Typography gutterBottom>
              Scan the provided QR code with your smartphone or tablet using a
              QR code scanner app. Once scanned, you will be directed to the
              streaming platform to access the stream. Enjoy the content and
              participate in the discussion or activities as directed by the
              hosts. If you encounter any issues, refer to the troubleshooting
              guide or contact support for assistance. 
            </Typography>
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Save changes
            </Button> */}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment> 
      
    </div>
  </div>
    <div id="footer">
    <p>&copy; 2024 BeAware. All rights reserved.</p>
  </div>
  </>
  );
};
 
export default Stream;