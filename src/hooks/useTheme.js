import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return {
    isDark,
    toggleTheme: () => setIsDark(prev => !prev)
  };
};