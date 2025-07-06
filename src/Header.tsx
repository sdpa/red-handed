// src/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: 'var(--primary-red)', // Use CSS variable
      padding: '1rem 2rem', // Added more horizontal padding
      color: 'var(--light-text)', // Use CSS variable
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Subtle shadow for depth
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Placeholder for logo - styled with CSS variables */}
        <svg className="app-logo" width="40" height="40" viewBox="0 0 100 100" style={{ marginRight: '15px' }}>
          {/* Simple conceptual logo: an eye (vigilance) with a shield (protection) */}
          <defs>
            <clipPath id="shieldClip">
              <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
            </clipPath>
          </defs>
          <rect width="100" height="100" fill="var(--secondary-red)" clipPath="url(#shieldClip)" />
          <circle cx="50" cy="45" r="15" fill="var(--light-text)" />
          <circle cx="50" cy="45" r="7" fill="var(--primary-red)" />
        </svg>
        <h1 style={{ margin: 0, fontSize: '1.8em' }}>Anti-Corruption India</h1> {/* Adjusted font size */}
      </div>
      {/* Navigation or other elements can go here */}
    </header>
  );
};

export default Header;
