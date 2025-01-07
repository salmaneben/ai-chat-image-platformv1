import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  X as CloseIcon, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const NOTIFICATION_TYPES = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconClass: 'text-green-400',
    progressClass: 'bg-green-400',
    title: 'Success',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconClass: 'text-red-400',
    progressClass: 'bg-red-400',
    title: 'Error',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconClass: 'text-yellow-400',
    progressClass: 'bg-yellow-400',
    title: 'Warning',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClass: 'text-blue-400',
    progressClass: 'bg-blue-400',
    title: 'Information',
  },
  ai: {
    icon: Sparkles,
    className: 'bg-purple-50 border-purple-200 text-purple-800',
    iconClass: 'text-purple-400',
    progressClass: 'bg-purple-400',
    title: 'AI Processing',
  },
};

export const NotificationContainer = ({ children }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2 max-h-screen overflow-hidden pointer-events-none">
    <div className="space-y-2 pointer-events-auto">{children}</div>
  </div>
);

export const Notification = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
  id,
  title,
  showProgress = true,
  action = null,
  description = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);
  const [isPaused, setIsPaused] = React.useState(false);

  const notificationConfig = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.info; // Fallback to info
  const Icon = notificationConfig.icon;

  React.useEffect(() => {
    if (isPaused || !duration) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;

      if (newProgress <= 0) {
        clearInterval(timer);
        setIsVisible(false);
        setTimeout(() => onClose?.(id), 300); // Ensure `onClose` exists
      } else {
        setProgress(newProgress);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [duration, onClose, id, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`relative min-w-[320px] max-w-md rounded-lg shadow-lg border ${notificationConfig.className}`}
      >
        {/* Main content */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <Icon className={`h-5 w-5 ${notificationConfig.iconClass} mt-0.5 flex-shrink-0`} />
            <div className="flex-1 pr-8">
              {title && <h4 className="text-sm font-semibold mb-1">{title}</h4>}
              <p className="text-sm">{message || description}</p>
              {description && message && (
                <p className="text-sm mt-1 text-gray-600">{description}</p>
              )}
              {action && (
                <div className="mt-2">
                  <button
                    onClick={action.onClick}
                    className="inline-flex items-center space-x-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <span>{action.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(id), 300);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {showProgress && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ease-linear ${notificationConfig.progressClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Export only Notification and NotificationContainer from this file
