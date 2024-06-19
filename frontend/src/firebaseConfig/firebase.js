import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBf_3Z4Gb1_FKPN_5veIoD4ryxlaWlNY4g",
    authDomain: "vivaprateadastore.firebaseapp.com",
    projectId: "vivaprateadastore",
    storageBucket: "vivaprateadastore.appspot.com",
    messagingSenderId: "520425878724",
    appId: "1:520425878724:web:3c9cf10d38ea56ac164591",
    measurementId: "G-R3N79ZP72N"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);