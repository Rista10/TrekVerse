"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({ children, variant = "primary", onClick }: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-full text-lg font-medium transition-colors";
  const variantStyles = {
    primary: "bg-purple-700 hover:bg-purple-800 text-white",
    secondary: "bg-amber-500 hover:bg-amber-600 text-white",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}