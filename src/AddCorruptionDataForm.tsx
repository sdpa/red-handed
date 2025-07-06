// src/AddCorruptionDataForm.tsx
import React, { useState } from 'react';

interface AddCorruptionDataFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void; // Ensure FormData type is defined or imported
}

// Re-defining FormData interface here if not imported from elsewhere
interface FormData {
  state: string;
  district: string;
  amount: string;
  department: string;
  date: string;
}

const AddCorruptionDataForm: React.FC<AddCorruptionDataFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    state: '',
    district: '',
    amount: '',
    department: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Consider clearing form or giving feedback, then closing
    // setFormData({ state: '', district: '', amount: '', department: '', date: '' });
    // onClose();
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for focus
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: 'var(--dark-bg)', // Use CSS variable
    padding: '2.5rem', // Increased padding
    borderRadius: '10px', // More rounded corners
    boxShadow: '0 5px 20px rgba(0,0,0,0.3)', // Enhanced shadow
    zIndex: 1000,
    color: 'var(--light-text)', // Use CSS variable
    width: 'clamp(320px, 90vw, 550px)', // Adjusted responsive width
    borderTop: '5px solid var(--primary-red)', // Red accent on top
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', // Full width relative to parent
    padding: '12px', // More padding in input
    margin: '8px 0 16px 0', // Adjusted margin (top, sides, bottom)
    borderRadius: '6px', // More rounded inputs
    border: '1px solid var(--accent-red)', // Use accent red for border
    backgroundColor: '#2c2c2c', // Slightly lighter dark for input background
    color: 'var(--light-text)', // Use CSS variable
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px', // Slightly more space for label
    fontWeight: 'bold',
    color: 'var(--secondary-red)', // Use secondary red for labels
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end', // Align buttons to the right
    marginTop: '1.5rem', // More space above buttons
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px', // Larger buttons
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'var(--primary-red)', // Use CSS variable
    color: 'var(--light-text)', // Use CSS variable
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease-in-out',
  };

  const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'transparent', // Make close button less prominent
    color: 'var(--secondary-red)',
    border: '1px solid var(--secondary-red)',
    marginLeft: '10px',
  };


  return (
    <div style={overlayStyle} onClick={onClose}> {/* Close on overlay click */}
      <div style={formStyle} onClick={e => e.stopPropagation()}> {/* Prevent form click from closing */}
        <h2 style={{
            color: 'var(--primary-red)',
            borderBottom: '2px solid var(--accent-red)',
            paddingBottom: '0.8rem',
            marginBottom: '1.5rem', // More space below title
            textAlign: 'center', // Center title
            fontSize: '1.6em'
        }}>Report Corruption Incident</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="state" style={labelStyle}>State</label>
            <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="district" style={labelStyle}>District</label>
            <input type="text" name="district" id="district" value={formData.district} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="amount" style={labelStyle}>Amount (INR)</label>
            <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="department" style={labelStyle}>Department</label>
            <input type="text" name="department" id="department" value={formData.department} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label htmlFor="date" style={labelStyle}>Date of Incident</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={buttonContainerStyle}>
            <button type="button" onClick={onClose} style={closeButtonStyle}>Cancel</button>
            <button type="submit" style={{...buttonStyle, marginLeft: '10px'}}>Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCorruptionDataForm;
