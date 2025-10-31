// import * as React from "react";
// import { cn } from "../../lib/utils";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "default" | "outline" | "ghost";
// }

// export function Button({ className, variant = "default", ...props }: ButtonProps) {
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

//   const variants: Record<string, string> = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     outline: "border border-gray-300 hover:bg-gray-100",
//     ghost: "hover:bg-gray-100 text-gray-700",
//   };

//   return (
//     <button className={cn(baseStyles, variants[variant], className)} {...props} />
//   );
// }
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'success';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary', 
  className = '', 
  type = 'button' 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};