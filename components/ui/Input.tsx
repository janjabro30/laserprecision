import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 
          focus:ring-2 focus:ring-gold focus:border-gold 
          hover:border-gold-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'} 
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}
