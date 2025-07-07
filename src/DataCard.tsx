// src/DataCard.tsx
import React from 'react';

interface DataCardProps {
  title: string;
  value: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
  return (
    <div style={{
      backgroundColor: 'var(--light-bg)', // White background
      border: `1px solid var(--border-color)`, // Subtle overall border
      padding: '1.25rem 1.5rem', // Adjusted padding
      borderRadius: '8px', // Slightly more rounded, common in modern UIs
      color: 'var(--text-primary)',
      marginBottom: '1rem', // Reduced margin if cards are close
      minWidth: '220px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)', // Very subtle shadow
      transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = 'var(--border-color-strong)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
    }}
    >
      <h3 style={{
        margin: '0 0 0.375rem 0', // Tighter margin for title (0.375rem = 6px)
        fontSize: '0.875rem', // Smaller, more common for card titles (0.875rem = 14px)
        color: 'var(--text-secondary)', // Secondary text color for title
        fontWeight: 500, // Medium weight for title
        textTransform: 'uppercase', // Uppercase titles are common in this style
        letterSpacing: '0.025em', // Slight letter spacing
      }}>{title}</h3>
      <p style={{
        margin: 0,
        fontSize: '1.75rem', // Slightly adjusted value size (1.75rem = 28px)
        fontWeight: 600, // Bolder for the value
        color: 'var(--text-primary)',
        lineHeight: 1.2, // Ensure value doesn't take too much vertical space
      }}>{value}</p>
    </div>
  );
};

export default DataCard;
