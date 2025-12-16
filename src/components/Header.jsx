import React from 'react';

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1>Prince's Reddit Client</h1>
        <div className="header-right">
          <button className="dark-mode-toggle" onClick={onToggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;