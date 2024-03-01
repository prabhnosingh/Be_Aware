//import firebase from 'firebase/app';
import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBSe37TLr-9eVmIEAkNqHY3nOZHOjxo30U",
    authDomain: "codezilla-2325a.firebaseapp.com",
    projectId: "codezilla-2325a",
    storageBucket: "codezilla-2325a.appspot.com",
    messagingSenderId: "814438060655",
    appId: "1:814438060655:web:060d19e8ade1c36ceb339a",
    measurementId: "G-CL353N4Z0Q"
  };
 // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export { firebaseApp }; 