'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiUsers, FiMail, FiShoppingBag } from 'react-icons/fi';

export default function CustomersPage() {
  const { data: session, status } = useSession();
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
          <h2 className="text-3xl font-bold text-dark">Kunder</h2>
          <p className="text-gray-600 mt-1">Administrer kundedata</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Totalt Kunder</p>
                <p className="text-3xl font-bold text-dark">0</p>
              </div>
              <FiUsers className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nye (Denne Uken)</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <FiMail className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Gjennomsnitt Ordre</p>
                <p className="text-3xl font-bold text-gold">0</p>
              </div>
              <FiShoppingBag className="w-12 h-12 text-gold" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <input
            type="search"
            placeholder="Søk etter kunde (e-post, navn, telefon)..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Customers List Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center text-gray-500">
            <FiUsers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Ingen kunder ennå</p>
            <p className="text-sm">Kundedata vil vises her når ordre legges inn</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
