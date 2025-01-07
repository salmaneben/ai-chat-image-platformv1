import React, { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationContainer } from './index';
import { notificationManager } from '../../../utils/notificationManager';

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Subscribe to notification manager updates
  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((newNotifications) => {
      console.debug('Notifications updated:', newNotifications); // Debug log
      setNotifications([...newNotifications]); // Ensure a new reference for state updates
    });

    return () => {
      unsubscribe();
      console.debug('Unsubscribed from notification manager'); // Cleanup log
    };
  }, []);

  // Close notification handler
  const handleClose = useCallback((id) => {
    console.debug('Closing notification with ID:', id); // Debug log
    notificationManager.remove(id); // Remove from manager
  }, []);

  return (
    <>
      {children}
      <NotificationContainer>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => handleClose(notification.id)} // Pass the ID to the handler
          />
        ))}
      </NotificationContainer>
    </>
  );
};

export default NotificationProvider;