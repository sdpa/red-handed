// src/DataCard.tsx
import React from 'react';

interface DataCardProps {
  title: string;
  value: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <div style={{
      backgroundColor: 'var(--dark-bg)', // Use CSS variable for dark background
      border: '1px solid var(--accent-red)', // Accent red border
      padding: '1.5rem', // Increased padding
      borderRadius: '8px',
      color: 'var(--light-text)', // Use CSS variable for light text
      marginBottom: '1.5rem', // Increased margin
      minWidth: '220px', // Slightly wider
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // Softer shadow
    }}>
      <h3 style={{
        margin: '0 0 0.5rem 0', // Adjusted margin for title
        fontSize: '1.1rem', // Slightly smaller title for a cleaner look
        color: 'var(--secondary-red)' // Title in secondary red
      }}>{title}</h3>
      <p style={{
        margin: 0,
        fontSize: '1.8rem', // Larger value text
        fontWeight: 'bold',
        color: 'var(--light-text)' // Value text in light color
      }}>{value}</p>
    </div>
  );
};

export default DataCard;
