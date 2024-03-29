

import React from 'react';
import BaseFrame from '../components/BaseFrame';
import styles from './Stream.module.css';
import firebase from 'firebase/compat/app'; // Import the Firebase App module
import 'firebase/compat/database';
import { useState, useEffect } from 'react';
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
import { blueGrey } from '@material-ui/core/colors';

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
  useEffect(() => {
    // Fetch userData from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
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

  return (
    <div className={styles.stream}>
      <BaseFrame />
      <div className={styles.uRLInstructionFrame}>
        <main className={styles.instructionsFrame}>
          <section className={styles.leftSection}>
            <img
              className={styles.qrCodeIcon}
              loading="eager"
              alt=""
              src="/qr-code.png"
            />
            <b
              className={styles.scanTheCode}
            >{`Scan the Code & be a part of the stream. We are waiting for you....`}</b>
            <div className={styles.instructionsButtonsContainer}>
              <button
                className={styles.linkInstructions}
                onClick={handleClickOpenInstructions}
                style={{backgroundColor:userData?userData.color:blueGrey}}
              >
                <div className={styles.linkInstructionsChild} />
                <b className={styles.instructions}>{`Instructions `}</b>
              </button>
              <button className={styles.linkInstructions1} onClick={handleClickOpenURL} style={{backgroundColor:userData?userData.color:blueGrey}}>
                <div className={styles.linkInstructionsItem} />
                <b className={styles.url}>URL</b>
              </button>
            </div>
          </section>
          <section className={styles.rightSection}>
            <img
              className={styles.onlineConnectionImageChild}
              loading="eager"
              alt=""
              src="/group-46.svg"
            />
            <img
              className={styles.undrawOnlineConnection6778Icon}
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
  );
};

export default Stream;

