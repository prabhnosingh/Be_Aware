//************************************** Body color changes behind the images */


import React from 'react';
import BaseFrame from '../components/BaseFrame';
import styles from './Stream.module.css';
import firebase from 'firebase/compat/app'; // Import the Firebase App module
import 'firebase/compat/database';
import { useState, useEffect } from 'react';
// import { firebaseApp } from '../../firebase'; // Import your Firebase configuration
import { firebaseApp } from '../firebase';
import axios from 'axios'; // Import Axios for making HTTP requests
import QRCode from 'qrcode.react'; // Import the QRCode component
import {   HuePicker } from 'react-color'

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
  
  
  const [background, setBackground] = useState('#fff');
  const [hexCode, setHexCode] = useState('#fff');
  
  const [qrCodeURL, setQrCodeURL] = useState(null);
  
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  
  // edit stream variables
  const [streamName, setStreamName] = useState(null);
  const [newStreamColor, setNewStreamColor] = useState(''); // use backgroundColor
  const [newLogoURl, setNewLogoUrl] = useState('');



  const [showConfirmation, setShowConfirmation] = useState(false);
  const[editInformation, setEditInformation] = useState(false);


  const handleHexCodeChange = (event) => {
    const newHexCode = event.target.value;
    setHexCode(newHexCode);
    setBackground(newHexCode);
  };
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };
  const handleColorChange = (color) => {
    setBackground(color.hex);
    setHexCode(color.hex);
    setNewStreamColor(color.hex);
    // setNewColor(color.hex);
  };
  // const[oldStreamName]

  // const [textColor, setTextColor] = useState(null);
  // const [backgroundColor, setBackgroundColor] = useState(() => {
  //   // Initialize background color from local storage or default to white
  //   return localStorage.getItem('backgroundColor') || '#FFFFFF';
  // });

  const [textColor, setTextColor] = useState(() => {
    // Initialize text color based on the background color
    return getContrastColor(backgroundColor);
  });
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
        // setStreamName(userData.username.toLowerCase())
        setStreamName('newStream')
        console.log("Stream name: ",streamName)
        const backgroundColor = userDataFromFirestore ? userDataFromFirestore.color : '#FF0000';
        console.log(userDataFromFirestore.username);
        console.log(userDataFromFirestore.url);
        console.log(userDataFromFirestore.color);
        

        console.log("***");
        setBackgroundColor(backgroundColor);
        setTextColor(getContrastColor(backgroundColor));
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    

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
    fetchUserData()

  };
 
  const handleCloseURL = () => {
    setOpenURL(false);
  };
 
  const handleDownloadPDF = () => {
    // Construct the URL of the PDF file stored in the public folder
    const pdfUrl = process.env.PUBLIC_URL + '/instructions.pdf';
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


const createStream = async () => {
  let response;
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.deafassistant.com/stream/CreateStreamWithStyle';
    const normalizedUsername = userData.username.toLowerCase(); // Normalize casing

     response = await axios.post(
      proxyUrl + apiUrl,
      
      {
        // name: userData.username,
        name: streamName, // Use normalized username

        bannerColor: userData.color,
        logoUrl: userData.url,
      },
      {
        headers: {
          'Origin': 'http://localhost:3000', // Replace with your actual origin
          'X-Requested-With': 'XMLHttpRequest', // Optional header for some proxy services
          'Retry-After': 3600
        },
      }
    );

    console.log('data', response.data);
    const { filePath } = response.data;
    setQrCodeURL(filePath);
    console.log(qrCodeURL + "qrcode");
  } catch (error) {
    console.error('Error creating stream:', error);
    if (error.response && error.response.status === 400) {
      console.log('Stream already exists:', error.response.data);
      confirmDelete();
      createStream();
      console.log(response)
      setQrCodeURL(error.response.data.filePath); // Update QR code URL if needed
    } else {
      console.error('Error creating stream:', error);
    }
  }
};

const renameStream = async () => {
  setEditInformation(false);
  
  let response;
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.deafassistant.com/stream/RenameStream';

    const normalizedUsername = userData.username.toLowerCase(); // Normalize casing if needed
     response = await axios.post(
      proxyUrl + apiUrl,
      {
        oldName: normalizedUsername,
        name: streamName, // New name for the stream
        bannerColor: newStreamColor, // Use color from userData
        logoUrl: newLogoURl, // Use URL from userData
      },
      {
        headers: {
          'Origin': 'http://localhost:3000', // Replace with your actual origin
          'X-Requested-With': 'XMLHttpRequest', // Optional header for some proxy services
        },
      }
    );

    console.log('Stream renamed:', response.data);
    const { filePath } = response.data;
    console.log("New url : ", filePath)
    setQrCodeURL(filePath);
    
   
    
  } catch (error) {
    console.error('Error creating stream:', error);
    if (error.response && error.response.status === 400) {
      console.log('Stream already exists:', error.response.data);
      console.log(response)
      setQrCodeURL(error.response.data.filePath); // Update QR code URL if needed
    } else {
      console.error('Error creating stream:', error);
    }
  }
};




const confirmDelete = () => { 

const deleteStream = async () => {
  console.log('user data user --- ',userData.username)
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.deafassistant.com/stream/DeleteStream';

    // const normalizedUsername = userData.username.toLowerCase(); // Normalize casing


    const response = await axios.post(
      proxyUrl + apiUrl,
     
      {
        // oldName: userData?.username || 'Default Username', // Change this to the appropriate field for oldName
        // oldName: userData.username
        oldName: streamName, // Use normalized username


      },
      {
        headers: {
          'Origin': 'http://localhost:3000', // Replace with your actual origin
          'X-Requested-With': 'XMLHttpRequest', // Optional header for some proxy services
        },
      }
    );

    console.log(userData.username)
    console.log('Stream deleted:', response.data);
    // Handle any additional logic after deleting the stream
  } catch (error) {
    console.error('Error deleting stream:', error);
  }
};

  setShowConfirmation(false);
  deleteStream();
  setQrCodeURL(null);
};

const cancelDelete = () => {
  // Hide confirmation popup
  setShowConfirmation(false);
  setEditInformation(false);
  // You might want to do something else here, like maybe closing a modal
};

  const handleCreateStream = () => {
    console.log('in handle stream')
    createStream();
  };

  const handleEditStream =() =>{
    setEditInformation(true);
   
    // setQrCodeURL(null);
  }

  const handleDeleteStream = () => {
    setShowConfirmation(true);
    // deleteStream();
  };

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
            {/* <img
              className={styles.qrCodeIcon}
              loading="eager"
              alt=""
              src="/qr-code.png"
            />
            <b
              className={styles.scanTheCode}
            >{`Scan the Code & be a part of the stream. We are waiting for you....`}</b> */}
                        {/* <button onClick={handleCreateStream}>Create Stream</button>
                        {qrCodeURL && <p>{qrCodeURL}</p>} */}

          <div>
          <button variant="contained"  style={{ marginRight: '100px',padding: '20px 40px', Size: '16px'  }} onClick={handleCreateStream}>Create Stream</button>
          <button variant="contained"  style={{ marginRight: '100px', padding: '20px 40px', fontSize: '16px'  }} onClick={handleDeleteStream}>Delete Stream</button>
          <button variant="contained"  style={{ marginRight: '100px', padding: '20px 40px', fontSize: '16px'  }} onClick={handleEditStream}>Edit Stream</button>

         
          {editInformation && (
                      <div>
                        <div
                          style={{
                            display: 'block',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999
                          }}
                          onClick={cancelDelete}
                        ></div>
                        <div
                          style={{
                            display: 'block',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '70px',
                            borderRadius: '8px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                            zIndex: 1000
                          }}
                        >
                          <p>Enter the new stream information</p>
                          <input
                              type="text"
                              placeholder="New Name"
                              style={{
                                marginTop: '20px',
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '10px'
                              }}
                              onChange={(e) => setStreamName(e.target.value)}
                            />
                          <input
                            
                            type="text"
                            placeholder="New Logo URL"
                            style={{
                              marginTop: '10px',
                              width: '100%',
                              padding: '10px',
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                              marginBottom: '20px'
                            }}
                            onChange={(e) => setNewLogoUrl(e.target.value)}
                            
                          />
                            <p style={{
                              fontSize: "18px"
                            }}>Select the new color</p>
                            <div className="input-field" style={{ marginLeft: '0px' }}>
                              <i className="fas fa-user"></i>
                              <input
                                
                                type="text"
                                id="hexcode"
                                value={hexCode}
                                onChange={handleHexCodeChange}
                              />
                            </div>
                            
                            
                            <div className="colorfield" style={{ 
                              marginLeft: '10px',
                              marginBottom: '30px', 
                              marginTop: '10px'
                              }}>
                            <HuePicker color={background} onChange={handleColorChange} />
                            </div>
                          <button
                            style={{
                              backgroundColor: '#1b4375',
                              marginRight: '10px',
                              padding: '10px 20px',
                              fontSize: '16px'
                            }}
                            onClick={renameStream}
                          >
                            Edit stream
                          </button>
                         
                            </div>
                          </div>
                        )}

        {showConfirmation && (
        <div>
          <div
            style={{
              display: 'block',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={cancelDelete}
          ></div>
          <div
            style={{
              display: 'block',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '70px',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
          >
            <p>Are you sure you want to delete this stream?</p>
            <button style={{ backgroundColor: 'green', marginTop: '50px',marginLeft: '50px',marginRight: '200px', padding: '20px 40px', fontSize: '16px' }} onClick={confirmDelete}>Yes</button>
            <button style={{ backgroundColor: 'red', padding: '20px 40px', fontSize: '16px' }} onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}


          {qrCodeURL && (
        <div style={{ marginTop: '100px',marginLeft:'40px' }}>
        <QRCode value={qrCodeURL} size={400} />
              {/* <p>{qrCodeURL}</p> */}
              <p>Scan and be a part of the Stream. We're excited to have you with us!</p>
            </div>
          )}
        </div>

          
        




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
    <p>
      Access the exclusive content by copying the stream link. Indulge in lively debates and exercises facilitated 
      by our hosts. In need of help? See our troubleshooting guide or contact our customer service staff.  
    </p>  
  <br/>


  {/* <p>
    Stream{" "}
    <a href={`https://deafassistant.com/${userData && userData.username.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
    {`https://deafassistant.com/${userData && userData.username.toLowerCase()}`}
  </a>

  </p> */}


  <p>
    Stream{" "}
    <a href={`${qrCodeURL}`} target="_blank" rel="noopener noreferrer">
    {`${qrCodeURL}`}
  </a>

  </p>
  
  
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