import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDPPae2pHmwCeESQRCSGh1e3XTmoYV5M8c",
    authDomain: "spotiplay-36879.firebaseapp.com",
    projectId: "spotiplay-36879",
    storageBucket: "spotiplay-36879.appspot.com",
    messagingSenderId: "764218555436",
    appId: "1:764218555436:web:5e427cfe6181c3e60ae589"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);