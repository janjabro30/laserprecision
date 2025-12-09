'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Hjem', href: '/' },
    { name: 'Produkter', href: '/produkter' },
    { name: 'Spesialbestilling', href: '/spesialbestilling' },
    { name: 'Spor Min Ordre', href: '/spor-ordre' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Om Oss', href: '/om-oss' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-dark transition-all duration-300 group-hover:scale-105">
              Laser <span className="text-gold shimmer-effect inline-block">Presisjon</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-dark hover:text-gold'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-gradient transition-all duration-300 group-hover:w-full ${
                  isActive(item.href) ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            <Link
              href="/handlekurv"
              className="relative p-2 text-dark hover:text-gold transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-dark hover:text-gold hover:bg-gold-50 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu - Full screen overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm md:hidden animate-fade-in z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-light shadow-2xl md:hidden z-50 animate-slide-in-right">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-dark">
                  Laser <span className="text-gold">Presisjon</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-dark hover:text-gold hover:bg-gold-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Gold accent line */}
              <div className="h-1 w-20 bg-gold-gradient rounded-full mb-8" />
              
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-4 text-base font-medium rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-gold bg-gold-50 border-l-4 border-gold'
                        : 'text-dark hover:text-gold hover:bg-gold-50 hover:border-l-4 hover:border-gold border-l-4 border-transparent'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/handlekurv"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-base font-medium text-dark hover:text-gold hover:bg-gold-50 rounded-lg transition-all duration-300 border-l-4 border-transparent hover:border-gold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Handlekurv
                  <span className="ml-auto bg-gold text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
