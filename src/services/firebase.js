// src/services/firebase.js

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Format user data
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      provider: 'google',
      token: await user.getIdToken()
    };

    // Store auth data
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('lastLoginTime', Date.now().toString());

    return userData;
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.clear();
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw new Error('Failed to sign out');
  }
};

export { auth };