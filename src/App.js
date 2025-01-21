import React, { useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout';
import { NotificationProvider } from './components/common/Notification/NotificationProvider';
import { checkAuthStatus, logout, refreshSession } from './redux/userSlice';
import { notificationManager } from './utils/notificationManager';

// Existing Pages
import Presentation from './pages/Presentation';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TextGenerator from './components/TextGenerator';
import ImageGenerator from './components/ImageGenerator';
import History from './components/History';

// New Pages
import Product from './pages/Product';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import Company from './pages/Company';
import About from './pages/About';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Privacy from './pages/Privacy';

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Auth Check Component
const AuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lastLoginTime = useSelector((state) => state.user.lastLoginTime);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    // Initial auth check
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        if (isAuthenticated) {
          notificationManager.error('Session expired', {
            description: 'Please login again',
          });
          navigate('/login', {
            replace: true,
            state: { from: location },
          });
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate, location, isAuthenticated]);

  // Regular session checks
  useEffect(() => {
    let sessionCheckInterval;
    let activityTimeout;

    if (isAuthenticated) {
      // Check session every minute
      sessionCheckInterval = setInterval(() => {
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
        if (lastLoginTime && Date.now() - lastLoginTime > sessionDuration) {
          dispatch(logout());
          notificationManager.warning('Session expired', {
            description: 'Please login again',
          });
          navigate('/login');
        }
      }, 60000);

      // Reset activity timer on user interaction
      const resetActivityTimer = () => {
        clearTimeout(activityTimeout);
        dispatch(refreshSession());

        // Set new timeout for inactivity (30 minutes)
        activityTimeout = setTimeout(() => {
          dispatch(logout());
          notificationManager.warning('Session expired due to inactivity', {
            description: 'Please login again',
          });
          navigate('/login');
        }, 30 * 60 * 1000);
      };

      // Activity listeners
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
      events.forEach((event) => {
        document.addEventListener(event, resetActivityTimer);
      });

      // Initial activity timer
      resetActivityTimer();

      // Cleanup
      return () => {
        clearInterval(sessionCheckInterval);
        clearTimeout(activityTimeout);
        events.forEach((event) => {
          document.removeEventListener(event, resetActivityTimer);
        });
      };
    }
  }, [dispatch, navigate, lastLoginTime, isAuthenticated]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return <LoadingScreen />;

  return (
    <ErrorBoundary>
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const intendedPath = location.state?.from?.pathname || '/dashboard';
      navigate(intendedPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (isAuthenticated) return <LoadingScreen />;

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  // Handle storage events for multi-tab support
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        if (!e.newValue) {
          dispatch(logout());
        } else {
          // Sync auth state across tabs
          const userData = JSON.parse(e.newValue);
          if (userData?.isAuthenticated) {
            dispatch(checkAuthStatus());
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <Suspense fallback={<LoadingScreen />}>
          <AuthCheck />
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Presentation />
                )
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* New Public Pages */}
            <Route path="/product" element={<PublicRoute><Product /></PublicRoute>} />
            <Route path="/features" element={<PublicRoute><Features /></PublicRoute>} />
            <Route path="/pricing" element={<PublicRoute><Pricing /></PublicRoute>} />
            <Route path="/documentation" element={<PublicRoute><Documentation /></PublicRoute>} />
            <Route path="/company" element={<PublicRoute><Company /></PublicRoute>} />
            <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
            <Route path="/blog" element={<PublicRoute><Blog /></PublicRoute>} />
            <Route path="/support" element={<PublicRoute><Support /></PublicRoute>} />
            <Route path="/privacy" element={<PublicRoute><Privacy /></PublicRoute>} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/ai-writer" element={<ProtectedRoute><TextGenerator /></ProtectedRoute>} />
            <Route path="/ai-image" element={<ProtectedRoute><ImageGenerator /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;