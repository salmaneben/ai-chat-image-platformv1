export const NOTIFICATION_TYPES = {
  success: {
    title: 'Success',
    duration: 3000,
    progressClass: 'bg-green-400',
  },
  error: {
    title: 'Error',
    duration: 5000,
    progressClass: 'bg-red-400',
  },
  warning: {
    title: 'Warning',
    duration: 4000,
    progressClass: 'bg-yellow-400',
  },
  info: {
    title: 'Information',
    duration: 3000,
    progressClass: 'bg-blue-400',
  },
  ai: {
    title: 'AI Processing',
    duration: 0,
    progressClass: 'bg-purple-400',
  },
};

let listeners = [];
let notificationId = 0;
const MAX_NOTIFICATIONS = 5;

class NotificationManager {
  notifications = [];

  /**
   * Subscribe a listener to receive notifications updates.
   * @param {Function} listener - The callback function to handle notifications updates.
   * @returns {Function} - Unsubscribe function.
   */
  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Add a new notification to the queue.
   * @param {Object} options - Notification details.
   * @returns {number} - The unique ID of the notification.
   */
  show({
    type = 'info',
    title = '',
    message = '',
    description = '',
    duration = null,
    showProgress = true,
    action = null,
  }) {
    const id = ++notificationId;

    const actualDuration = duration ?? (NOTIFICATION_TYPES[type]?.duration || 3000); // Default duration if type not found
    const actualTitle = title || (NOTIFICATION_TYPES[type]?.title || 'Notification'); // Default title fallback

    const notification = {
      id,
      type,
      title: actualTitle,
      message,
      description,
      duration: actualDuration,
      showProgress,
      action,
      timestamp: Date.now(),
    };

    // Enforce the max notification limit
    this.notifications = [notification, ...this.notifications.slice(0, MAX_NOTIFICATIONS - 1)];

    this._notify(); // Notify subscribers
    return id;
  }

  /**
   * Remove a notification by its ID.
   * @param {number} id - The unique ID of the notification.
   */
  remove(id) {
    console.debug(`Removing notification with ID: ${id}`); // Debug log
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this._notify(); // Notify subscribers
  }

  /**
   * Clear all notifications.
   */
  clear() {
    console.debug('Clearing all notifications'); // Debug log
    this.notifications = [];
    this._notify(); // Notify subscribers
  }

  /**
   * Notify all subscribed listeners with the latest notifications.
   * @private
   */
  _notify() {
    listeners.forEach((listener) => listener(this.notifications));
  }

  // Shortcut methods for different notification types
  success(title, options = {}) {
    return this.show({ type: 'success', title, ...options });
  }

  error(title, options = {}) {
    return this.show({ type: 'error', title, ...options });
  }

  warning(title, options = {}) {
    return this.show({ type: 'warning', title, ...options });
  }

  info(title, options = {}) {
    return this.show({ type: 'info', title, ...options });
  }

  ai(title, options = {}) {
    return this.show({
      type: 'ai',
      title,
      duration: 0,
      showProgress: true,
      ...options,
    });
  }
}

export const notificationManager = new NotificationManager();