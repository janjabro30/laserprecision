import React from 'react';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className="relative inline-block">
      <div className={`${sizeClass} border-4 border-gold-200 rounded-full`} />
      <div className={`${sizeClass} border-4 border-transparent border-t-gold rounded-full animate-spin absolute inset-0`} />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-dark font-medium">Laster...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gold-100" />
      <div className="p-4">
        <div className="h-4 bg-gold-100 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gold-100 rounded w-full mb-2" />
        <div className="h-3 bg-gold-100 rounded w-2/3" />
      </div>
    </div>
  );
}
