'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiPackage } from 'react-icons/fi';

export default function ReportsPage() {
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
        <div>
          <h2 className="text-3xl font-bold text-dark">Rapporter & Analyse</h2>
          <p className="text-gray-600 mt-1">Oversikt over salg og ytelse</p>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gold text-white rounded-lg">
              I Dag
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Denne Uken
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Denne Måneden
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              I År
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Tilpasset
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <FiDollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-dark">0 kr</span>
            </div>
            <p className="text-sm text-gray-600">Total Omsetning</p>
            <p className="text-xs text-green-600 mt-1">+0% fra forrige periode</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <FiShoppingBag className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-dark">0</span>
            </div>
            <p className="text-sm text-gray-600">Antall Ordre</p>
            <p className="text-xs text-blue-600 mt-1">+0% fra forrige periode</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <FiPackage className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-dark">0 kr</span>
            </div>
            <p className="text-sm text-gray-600">Gjennomsnittlig Ordre</p>
            <p className="text-xs text-purple-600 mt-1">+0% fra forrige periode</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gold">
            <div className="flex items-center justify-between mb-2">
              <FiTrendingUp className="w-8 h-8 text-gold" />
              <span className="text-2xl font-bold text-dark">0</span>
            </div>
            <p className="text-sm text-gray-600">Nye Kunder</p>
            <p className="text-xs text-gold mt-1">+0% fra forrige periode</p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-dark mb-4">Mest Solgte Produkter</h3>
            <div className="text-center py-12 text-gray-500">
              <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Ingen data tilgjengelig</p>
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-dark mb-4">Omsetning per Kategori</h3>
            <div className="text-center py-12 text-gray-500">
              <FiTrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Ingen data tilgjengelig</p>
            </div>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-dark mb-4">Ordrestatus Oversikt</h3>
            <div className="text-center py-12 text-gray-500">
              <FiShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Ingen data tilgjengelig</p>
            </div>
          </div>

          {/* Customer Acquisition */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-dark mb-4">Kundeutvikling</h3>
            <div className="text-center py-12 text-gray-500">
              <FiTrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">Ingen data tilgjengelig</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
