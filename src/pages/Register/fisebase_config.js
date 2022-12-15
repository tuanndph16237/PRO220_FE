// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FISEBASE_apiKey,
    authDomain: import.meta.env.VITE_FISEBASE_authDomain,
    projectId: import.meta.env.VITE_FISEBASE_projectId,
    storageBucket: import.meta.env.VITE_FISEBASE_storageBucket,
    messagingSenderId: import.meta.env.VITE_FISEBASE_messagingSenderId,
    appId: import.meta.env.VITE_FISEBASE_appId,
    measurementId: import.meta.env.VITE_FISEBASE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
