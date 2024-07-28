import React from "react";

const Logo = ({ color }) => {
  return (
    <svg
      className={`w-8 ${color} text-teal-accent-400`}
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      stroke="currentColor"
      fill="none"
    >
      <rect x="2" y="2" width="7" height="10" />
      <rect x="1" y="19" width="7" height="7" />
      <rect x="12" y="13" width="7" height="14" />
    </svg>
  );
};

export default Logo;