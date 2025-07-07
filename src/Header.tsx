// src/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--light-bg)', // White background
      padding: '0.75rem 2rem', // Adjusted padding
      color: 'var(--text-primary)', // Dark text
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid var(--border-color)`, // Subtle bottom border
      height: '64px', // Common header height
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg
          className="app-logo"
          width="32" // Slightly smaller logo
          height="32"
          viewBox="0 0 100 100"
          style={{ marginRight: '12px' }}
          aria-label="Application Logo"
        >
          {/* Shield shape using subtle red */}
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="var(--primary-red)" />
          {/* Inner symbol in white */}
          <circle cx="50" cy="45" r="12" fill="var(--light-bg)" />
          <circle cx="50" cy="45" r="6" fill="var(--primary-red)" />
        </svg>
        <h1 style={{
          margin: 0,
          fontSize: '1.5em', // Adjusted for a more subtle header title
          fontWeight: 600, // Medium-bold
          color: 'var(--text-primary)' // Dark text for title
        }}>
          Anti-Corruption India
        </h1>
      </div>
      {/* Placeholder for potential nav items or user profile icon */}
      {/* <div>
        <a href="/about" style={{color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem'}}>About</a>
        <button>Login</button>
      </div> */}
    </header>
  );
};

export default Header;
