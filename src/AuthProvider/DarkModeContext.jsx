import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Toggle dark class on the root element
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Save the user's preference to localStorage
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
