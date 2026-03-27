import React from 'react';

// The specific green color from the provided image
const BRAND_GREEN = "#11A649";

const Logo = ({ className = "h-12 w-12", alt = "HealthLinka Logo" }) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none" 
      stroke={BRAND_GREEN} // Matches the color from your PNG
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-labelledby="logoTitle logoDesc"
      role="img"
    >
      <title id="logoTitle">{alt}</title>
      <desc id="logoDesc">A green medical cross outline integrated with a dynamic heartbeat ECG pulse line.</desc>
      
      {/* 1. The main medical cross outline */}
      <path d="M22 10H42M42 10V22M42 22H54V42H42V54H22V42H10V22H22V10Z" />
      
      {/* 2. The integrated ECG/Heartbeat pulse line */}
      <path d="M10 32H25L28.5 24.5L35.5 39.5L39 32H54" />
      
      {/* 3. The inner horizontal structure lines (Top and Bottom of middle segment) */}
      <path d="M10 22H54" />
      <path d="M10 42H54" />
      
      {/* 4. The connecting segments that link the cross structure */}
      <path d="M22 22V10M22 42V54" />
      <path d="M42 22V10M42 42V54" />
    </svg>
  );
};

export default Logo;