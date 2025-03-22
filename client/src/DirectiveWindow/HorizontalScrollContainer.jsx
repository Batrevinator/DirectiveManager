import React from 'react';

const HorizontalScrollContainer = ({ children }) => {
  return (
    <div className= "hide-scrollbar" style={{ 
      display: 'flex', // Ensure a horizontal layout
        overflowX: 'auto', // Enable horizontal scrolling if content overflows
        maxHeight: '500px', // Prevent vertical growth
        border: '1px solid #ccc',
        padding: '10px',
    }}>
      {children}
    </div>
  );
};

export default HorizontalScrollContainer