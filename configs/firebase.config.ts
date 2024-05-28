// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    apiId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
    authDomain: 'mathtuto-708ed.firebaseapp.com',
    projectId: 'mathtuto-708ed',
    storageBucket: 'mathtuto-708ed.appspot.com',
    messagingSenderId: '464313574732',
    measurementId: 'G-WL7TZDPF3J'
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;