'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiAlertTriangle, FiPackage, FiTrendingDown } from 'react-icons/fi';

export default function InventoryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-dark">Lagerbeholdning</h2>
            <p className="text-gray-600 mt-1">Administrer produktbeholdning</p>
          </div>
          <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
            Oppdater Beholdning
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Totalt Produkter</p>
                <p className="text-3xl font-bold text-dark">0</p>
              </div>
              <FiPackage className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Lav Beholdning</p>
                <p className="text-3xl font-bold text-yellow-600">0</p>
              </div>
              <FiTrendingDown className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Utsolgt</p>
                <p className="text-3xl font-bold text-red-600">0</p>
              </div>
              <FiAlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Inventory Table Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center text-gray-500">
            <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Ingen lagerbeholdning registrert</p>
            <p className="text-sm">Legg til produkter for å spore lagerbeholdning</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
