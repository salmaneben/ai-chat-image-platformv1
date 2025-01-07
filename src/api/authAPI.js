// src/api/authAPI.js

import { signInWithGoogle, signOut } from '../services/googleAuth';

export const login = async (credentials) => {
  try {
    if (credentials.provider === 'google') {
      const user = await signInWithGoogle();
      return { user };
    }

    // Handle email/password login if needed
    // Implement email/password login logic here

    throw new Error('Invalid login provider');
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    if (userData.provider === 'google') {
      const user = await signInWithGoogle();
      return { user };
    }

    // Handle email/password registration if needed
    // Implement email/password registration logic here

    throw new Error('Invalid registration provider');
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    throw new Error('Logout failed');
  }
};
