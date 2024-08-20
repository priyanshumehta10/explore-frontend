import React from "react";
import logoMain from "../assets/logoMain.png";
// import './Logo.css'; // Import the CSS file for styling

function MainLogo({ width = "1000px", header = false }) {
  return (
    <div className={`logo-container ${header ? "header-logo" : ""}`}>
      <img className="logo" src={logoMain} alt="Blog Logo" style={{ width }} />
    </div>
  );
}

export default MainLogo;
