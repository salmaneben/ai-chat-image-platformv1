// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Auth Middleware
const authMiddleware = store => next => action => {
  // Handle actions that require auth checks
  if (action.type === 'user/logout') {
    localStorage.clear();
  }

  // Check for session expiry before each action
  const state = store.getState();
  const lastLoginTime = state.user.lastLoginTime;
  const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

  if (lastLoginTime && Date.now() - lastLoginTime > sessionDuration) {
    store.dispatch({ type: 'user/logout' });
    return next(action);
  }

  return next(action);
};

// Create store with middleware
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

// Subscribe to store changes to sync with localStorage
store.subscribe(() => {
  const state = store.getState();
  if (state.user.isAuthenticated) {
    try {
      localStorage.setItem('user', JSON.stringify(state.user.user));
      localStorage.setItem('lastLoginTime', JSON.stringify(state.user.lastLoginTime));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
});