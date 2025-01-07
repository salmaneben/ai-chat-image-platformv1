import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  User,
  LogOut,
  Search
} from 'lucide-react';

export const MenuItem = ({ item, isCollapsed, isDark }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  
  return (
    <Link 
      to={item.path}
      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? `${isDark ? 'bg-primary-900/50' : 'bg-primary-100'} ${isDark ? 'text-primary-400' : 'text-primary-700'}` 
          : `${isDark ? 'text-gray-300 hover:bg-dark-border' : 'text-gray-600 hover:bg-gray-100'}`
      } ${item.highlight ? `bg-gradient-to-r ${isDark ? 'from-primary-900/30 to-blue-900/30' : 'from-primary-50 to-blue-50'} hover:from-primary-100 hover:to-blue-100` : ''}`}
    >
      <div className="flex items-center space-x-3">
        <item.icon className={`h-5 w-5 ${isActive ? (isDark ? 'text-primary-400' : 'text-primary-600') : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
        {!isCollapsed && (
          <span className="font-medium text-sm">{item.name}</span>
        )}
      </div>
      {!isCollapsed && item.badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          item.badge === 'Pro' 
            ? `${isDark ? 'bg-primary-900/50 text-primary-400' : 'bg-primary-100 text-primary-700'}`
            : item.badge === 'Special'
              ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white'
              : `${isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700'}`
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  );
};

export const NotificationItem = ({ notification, onClick, isDark }) => {
  const Icon = notification.type === 'success' ? CheckCircle 
    : notification.type === 'error' ? AlertCircle 
    : Bell;
    
  return (
    <button
      onClick={() => onClick(notification)}
      className={`w-full px-4 py-3 flex items-start space-x-3 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-50'} transition-colors
        ${notification.read ? 'opacity-60' : ''}`}
    >
      <Icon className={`h-5 w-5 mt-0.5 ${
        notification.type === 'success' ? 'text-green-500' :
        notification.type === 'error' ? 'text-red-500' :
        'text-blue-500'
      }`} />
      
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{notification.title}</p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{notification.message}</p>
        <div className="flex items-center mt-1">
          <Clock className={`h-3 w-3 ${isDark ? 'text-gray-500' : 'text-gray-400'} mr-1`} />
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{notification.time}</span>
        </div>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
      )}
    </button>
  );
};

export const UserMenu = ({ user, onProfileClick, onSettingsClick, onLogout, isDark }) => (
  <div className={`absolute bottom-full left-0 w-full mb-2 ${isDark ? 'bg-dark-paper' : 'bg-white'} rounded-lg shadow-lg border ${isDark ? 'border-dark-border' : ''} py-1 z-50`}>
    <button
      onClick={onProfileClick}
      className={`flex items-center w-full px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-dark-border' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <User className="h-4 w-4 mr-2" />
      Profile
    </button>
    <button
      onClick={onSettingsClick}
      className={`flex items-center w-full px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-dark-border' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <Settings className="h-4 w-4 mr-2" />
      Settings
    </button>
    <button
      onClick={onLogout}
      className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'}`}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </button>
  </div>
);

export const SearchBar = ({ query, isSearching, onChange, onSubmit, isDark }) => (
  <form onSubmit={onSubmit} className="w-full">
    <div className="relative">
      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
        ${isSearching ? 'text-primary-500 animate-pulse' : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search anything..."
        className={`w-full pl-10 pr-4 py-2 ${
          isDark 
            ? 'bg-dark-border border-dark-border focus:bg-dark-paper text-gray-200 placeholder-gray-500' 
            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
        } border rounded-lg text-sm 
          focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
        disabled={isSearching}
      />
    </div>
  </form>
);