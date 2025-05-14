import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
