'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  FiHome, FiPackage, FiShoppingBag, FiUsers, 
  FiFileText, FiSettings, FiBarChart2, FiMenu,
  FiX, FiLogOut, FiBox, FiTruck
} from 'react-icons/fi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Produkter', href: '/admin/produkter', icon: FiPackage },
    { name: 'Bestillinger', href: '/admin/bestillinger', icon: FiShoppingBag },
    { name: 'Spesialbestillinger', href: '/admin/spesialbestillinger', icon: FiBox },
    { name: 'Lagerbeholdning', href: '/admin/lagerbeholdning', icon: FiTruck },
    { name: 'Kunder', href: '/admin/kunder', icon: FiUsers },
    { name: 'Innhold', href: '/admin/innhold', icon: FiFileText },
    { name: 'Rapporter', href: '/admin/rapporter', icon: FiBarChart2 },
    { name: 'Innstillinger', href: '/admin/innstillinger', icon: FiSettings },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-dark via-dark-lighter to-dark text-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gold/20">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                Laser <span className="text-gold shimmer-effect inline-block">Presisjon</span>
              </span>
            </Link>
            <div className="h-1 w-16 bg-gold-gradient rounded-full mt-2" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-gold text-dark font-semibold shadow-lg'
                        : 'text-gray-300 hover:bg-dark-lighter hover:text-gold'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User info & Logout */}
          <div className="p-4 border-t border-gold/20">
            <div className="mb-3 px-4">
              <p className="text-sm text-gray-400">Innlogget som</p>
              <p className="text-white font-medium truncate">{session?.user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-lighter hover:text-red-400 transition-all duration-200 w-full"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logg Ut</span>
            </button>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-dark-lighter text-white lg:hidden hover:bg-gold hover:text-dark transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-dark hover:bg-gold-50 hover:text-gold transition-colors lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 lg:ml-0 ml-4">
              <h1 className="text-2xl font-bold text-dark">
                Admin <span className="text-gold">Dashboard</span>
              </h1>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-gold hover:text-gold-600 transition-colors"
            >
              Se Nettside →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
