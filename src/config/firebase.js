// src/config/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUivsiXcVS9r5tNN3ntGaYzg5Yclddffs",
  authDomain: "ai-chat-platform-4d73d.firebaseapp.com",
  projectId: "ai-chat-platform-4d73d",
  storageBucket: "ai-chat-platform-4d73d.firebasestorage.app",
  messagingSenderId: "596050181239",
  appId: "1:596050181239:web:1ae875e35e913c2ccc9a72",
  measurementId: "G-3TK5JBF24T"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  app = window.firebase?.apps?.[0] || initializeApp(firebaseConfig);
}

// Get Auth instance
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, app, googleProvider };
