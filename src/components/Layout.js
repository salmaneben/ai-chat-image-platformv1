import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  Menu,
  Bell,
  Sparkles,
  Settings,
  Sun,
  Moon,
  User,
  LogOut,
  Search
} from 'lucide-react';

import { getMenuItems } from './layout/types';
import { MenuItem, NotificationItem } from './layout/components';
import { useLayoutLogic } from './layout/hooks';
import { useTheme } from '../hooks/useTheme';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    showMenu,
    isCollapsed,
    showNotifications,
    notifications,
    searchQuery,
    isSearching,
    unreadCount,
    setShowMenu,
    setShowNotifications,
    setSearchQuery,
    handleLogout,
    handleSearch,
    handleNotificationClick,
    handleClearNotifications,
    toggleSidebar,
  } = useLayoutLogic();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-dark-bg' : 'bg-gray-50'}`}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full ${isDark ? 'bg-dark-paper border-dark-border' : 'bg-white border-gray-200'} border-r z-30 transition-all duration-300 
        ${isCollapsed ? 'w-16' : 'w-64'} 
        lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Platform</span>
                </div>
              )}
              <button 
                onClick={toggleSidebar}
                className={`p-1 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                title={isCollapsed ? "Expand menu" : "Collapse menu"}
              >
                {isCollapsed ? (
                  <Menu className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-6">
              {getMenuItems(unreadCount).map((section, idx) => (
                <div key={idx}>
                  {!isCollapsed && (
                    <h3 className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'} uppercase mb-2`}>
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <MenuItem 
                        key={item.path} 
                        item={item} 
                        isCollapsed={isCollapsed}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          <div className={`border-t ${isDark ? 'border-dark-border' : 'border-gray-200'} p-4`}>
            {user && (
              <div className="relative" data-menu="true">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className={`flex items-center space-x-3 w-full ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'} rounded-lg p-2 transition-colors`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-100 to-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user.name?.[0] || 'U'}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                          {user.name || 'User'}
                        </div>
                        <div className="text-xs text-primary-600">Pro Account</div>
                      </div>
                      <Settings className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </>
                  )}
                </button>

                {showMenu && !isCollapsed && (
                  <div className={`absolute bottom-full left-0 w-full mb-2 ${isDark ? 'bg-dark-paper' : 'bg-white'} rounded-lg shadow-lg border ${isDark ? 'border-dark-border' : 'border-gray-200'} py-1 z-50`}>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        navigate('/profile');
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-dark-border' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        navigate('/settings');
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-dark-border' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleLogout();
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'}`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className={`${isDark ? 'bg-dark-paper border-dark-border' : 'bg-white border-gray-200'} border-b 
          fixed top-0 right-0 left-0 z-20 transition-all duration-300
          ${isScrolled ? 'h-14' : 'h-16'} 
          ${isCollapsed ? 'lg:left-16' : 'lg:left-64'}`}>
          <div className="flex items-center justify-between px-4 lg:px-6 h-full">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg hidden sm:block">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                  ${isSearching ? 'text-primary-500 animate-pulse' : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className={`w-full pl-10 pr-4 py-2 ${
                    isDark 
                      ? 'bg-dark-border border-dark-border focus:bg-dark-paper text-gray-200 placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border rounded-lg text-sm 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                  disabled={isSearching}
                />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative" data-notifications="true">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 ${isDark ? 'hover:bg-dark-border' : 'hover:bg-gray-100'} rounded-lg relative transition-colors`}
                  title="Notifications"
                >
                  <Bell className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 ${isDark ? 'bg-dark-paper' : 'bg-white'} rounded-lg shadow-lg border ${isDark ? 'border-dark-border' : ''} py-2 z-50`}>
                    <div className={`flex items-center justify-between px-4 py-2 border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
                      <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>Notifications</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearNotifications}
                          className={`text-xs ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <Bell className={`h-8 w-8 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-2`} />
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <NotificationItem 
                            key={notification.id}
                            notification={notification}
                            onClick={handleNotificationClick}
                            isDark={isDark}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Search - Shown below header on small screens */}
        <div className="sm:hidden px-4 py-2 bg-white dark:bg-dark-paper border-b border-gray-200 dark:border-dark-border">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
              ${isSearching ? 'text-primary-500 animate-pulse' : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className={`w-full pl-10 pr-4 py-2 ${
                isDark 
                  ? 'bg-dark-border border-dark-border focus:bg-dark-paper text-gray-200 placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } border rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
              disabled={isSearching}
            />
          </form>
        </div>

        {/* Main Content */}
        <main className={`p-4 lg:p-6 ${isScrolled ? 'mt-14' : 'mt-16'} sm:mt-16`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;