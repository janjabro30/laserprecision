import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gold text-white hover:bg-gold-400 active:bg-gold-500 shadow-md hover:shadow-lg',
    secondary: 'bg-dark text-white hover:bg-dark-lighter active:bg-dark-darker shadow-md hover:shadow-lg',
    outline: 'border-2 border-gold text-gold hover:bg-gold-50 active:bg-gold-100',
    gold: 'bg-gold-gradient text-white hover:shadow-xl active:scale-95 shimmer-effect',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
