// src/App.jsx

import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update the HTML `class` attribute based on dark mode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-800 p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-500 dark:bg-blue-700 text-white text-center flex justify-between items-center">
          <h1 className="text-xl font-semibold">CommunityCare AI</h1>
          <button
            onClick={toggleDarkMode}
            className="text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
