import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authAPI';
import { auth } from '../config/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { preserveUserStats, restoreUserStats } from '../utils/statsTracker'; // Removed clearStats

// Configurable session duration (default: 24 hours)
const SESSION_DURATION = process.env.REACT_APP_SESSION_DURATION || 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to safely parse JSON from localStorage
const safeJSONParse = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to safely set localStorage
const safeLocalStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

// Load initial state from localStorage with session check
const loadInitialState = () => {
  const user = safeJSONParse('user');
  const lastLoginTime = safeJSONParse('lastLoginTime');

  // Check if session is expired
  if (lastLoginTime && Date.now() - lastLoginTime > SESSION_DURATION) {
    if (user?.uid) {
      preserveUserStats(user.uid); // Preserve stats before clearing session
    }
    // Clear session-specific data
    localStorage.removeItem('user');
    localStorage.removeItem('lastLoginTime');
    localStorage.removeItem('token');

    return {
      user: null,
      status: 'idle',
      error: null,
      isAuthenticated: false,
      lastLoginTime: null,
    };
  }

  return {
    user,
    status: 'idle',
    error: null,
    isAuthenticated: !!user,
    lastLoginTime,
  };
};

// Async thunks
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      if (response.user?.uid) restoreUserStats(response.user.uid);
      safeLocalStorageSet('user', response.user);
      safeLocalStorageSet('lastLoginTime', Date.now());
      if (response.token) localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      if (response.user?.uid) restoreUserStats(response.user.uid);
      safeLocalStorageSet('user', response.user);
      safeLocalStorageSet('lastLoginTime', Date.now());
      if (response.token) localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      console.error('Registration Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const setGoogleUser = createAsyncThunk(
  'user/setGoogleUser',
  async (userData, { rejectWithValue }) => {
    try {
      if (userData?.uid) restoreUserStats(userData.uid);
      safeLocalStorageSet('user', userData);
      safeLocalStorageSet('lastLoginTime', Date.now());
      return { user: userData };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return rejectWithValue('Failed to set Google user');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async (_, { getState, dispatch }) => {
    const { lastLoginTime } = getState().user;
    if (lastLoginTime && Date.now() - lastLoginTime > SESSION_DURATION) {
      dispatch(logout());
      throw new Error('Session expired');
    }
    const user = safeJSONParse('user');
    if (!user) throw new Error('No user found');
    if (user?.uid) restoreUserStats(user.uid);
    return { user, lastLoginTime };
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user;
      const updatedUser = { ...user, ...userData }; // Mock update logic
      safeLocalStorageSet('user', updatedUser); // Update localStorage
      return updatedUser;
    } catch (error) {
      console.error('Update Error:', error);
      return rejectWithValue('Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: loadInitialState(),
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.lastLoginTime = Date.now();
      if (action.payload?.uid) {
        restoreUserStats(action.payload.uid);
        safeLocalStorageSet('user', action.payload);
        safeLocalStorageSet('lastLoginTime', state.lastLoginTime);
      }
    },
    logout: (state) => {
      if (state.user?.uid) preserveUserStats(state.user.uid);
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.isAuthenticated = false;
      state.lastLoginTime = null;
      localStorage.clear(); // Clear all localStorage
      firebaseSignOut(auth).catch((error) => console.error('Firebase Sign-Out Error:', error));
    },
    clearError: (state) => {
      state.error = null;
    },
    refreshSession: (state) => {
      state.lastLoginTime = Date.now();
      safeLocalStorageSet('lastLoginTime', state.lastLoginTime);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.lastLoginTime = Date.now();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.lastLoginTime = Date.now();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.lastLoginTime = action.payload.lastLoginTime;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.lastLoginTime = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || 'User update failed';
      });
  },
});

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAuthStatus = (state) => state.user.status;
export const selectAuthError = (state) => state.user.error;
export const selectLastLoginTime = (state) => state.user.lastLoginTime;

export const { setUser, logout, clearError, refreshSession } = userSlice.actions;
export default userSlice.reducer;