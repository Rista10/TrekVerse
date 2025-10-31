// import * as React from "react";
// import { cn } from "../../lib/utils";

// export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("rounded-xl border border-gray-200 bg-white shadow-sm", className)}
//       {...props}
//     />
//   );
// }

// export function CardContent({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return <div className={cn("p-6", className)} {...props} />;
// }

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);