// src/services/googleAuth.js

import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Open a popup window for Google sign-in
    const result = await signInWithPopup(auth, googleProvider);
    // The signed-in user info
    const user = result.user;
    // You can access additional user information if needed
    return user;
  } catch (error) {
    // Handle Errors here
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
};
