import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { notificationManager } from '../../utils/notificationManager';
import { NOTIFICATION_EXAMPLES } from './types';

export const useLayoutLogic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // States
  const [showMenu, setShowMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATION_EXAMPLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMenuClick = event.target.closest('[data-menu]');
      const isNotificationClick = event.target.closest('[data-notifications]');
      
      if (!isMenuClick && !isNotificationClick) {
        setShowMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    try {
      // Clear Redux state and localStorage
      dispatch(logout());
      
      // Navigate first
      navigate('/login', { replace: true });
      
      // Show success notification after navigation
      notificationManager.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      notificationManager.error('Logout failed', {
        description: 'Please try again'
      });
    }
  }, [dispatch, navigate]);

  // Navigation handlers
  const handleProfileClick = useCallback(() => {
    setShowMenu(false);
    navigate('/profile');
  }, [navigate]);

  const handleSettingsClick = useCallback(() => {
    setShowMenu(false);
    navigate('/settings');
  }, [navigate]);

  // Search handler
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    notificationManager.show({
      type: 'info',
      description: 'Searching...',
      duration: 1000
    });

    setTimeout(() => {
      setIsSearching(false);
      notificationManager.success(`Found results for "${searchQuery}"`);
    }, 1000);
  }, [searchQuery]);

  // Notification handlers
  const handleNotificationClick = useCallback((notification) => {
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    if (notification.type === 'info') {
      setShowNotifications(false);
      navigate('/settings');
    }
  }, [navigate]);

  const handleClearNotifications = useCallback(() => {
    setNotifications([]);
    setShowNotifications(false);
    notificationManager.success('Notifications cleared');
  }, []);

  // Sidebar handler
  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    // States
    showMenu,
    isCollapsed,
    showNotifications,
    notifications,
    searchQuery,
    isSearching,
    unreadCount,
    
    // Setters
    setShowMenu,
    setShowNotifications,
    setSearchQuery,
    
    // Handlers
    handleLogout,
    handleSearch,
    handleNotificationClick,
    handleClearNotifications,
    toggleSidebar,
    handleProfileClick,
    handleSettingsClick,
  };
};