import React from 'react';
import exploreLogo from "../assets/exploreLogo.png"
// import './Logo.css'; // Import the CSS file for styling

function Logo({ width = '10px', header = false }) {
  return (
    <div className={`logo-container ${header ? 'header-logo' : ''}`}>
      <img className='logo' src={exploreLogo} alt="Blog Logo" style={{ width, height: 'auto', background: 'transparent' }} />
    </div>
  );
}

export default Logo;
