// import * as React from "react";
// import { cn } from "../../lib/utils";

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// export const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, ...props }, ref) => {
//     return (
//       <input
//         ref={ref}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
//           className
//         )}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";


import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: LucideIcon;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ 
  placeholder, 
  name, 
  value, 
  onChange, 
  required, 
  icon: Icon,
  label 
}) => (
  <div>
    {label && (
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon size={20} />
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400`}
      />
    </div>
  </div>
);
