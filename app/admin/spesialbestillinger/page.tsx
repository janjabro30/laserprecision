'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiBox, FiCheckCircle, FiClock, FiTool } from 'react-icons/fi';

export default function SpecialOrdersPage() {
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

  const statusSteps = [
    { name: 'Mottatt', icon: FiBox, color: 'blue' },
    { name: 'Venter på godkjenning', icon: FiClock, color: 'yellow' },
    { name: 'Godkjent', icon: FiCheckCircle, color: 'green' },
    { name: 'Under produksjon', icon: FiTool, color: 'purple' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-dark">Spesialbestillinger</h2>
          <p className="text-gray-600 mt-1">Administrer kundetilpassede ordre</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4"
                style={{ borderLeftColor: `var(--${step.color}-500)` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 text-${step.color}-500`} />
                  <span className="text-2xl font-bold text-dark">0</span>
                </div>
                <p className="text-sm text-gray-600">{step.name}</p>
              </div>
            );
          })}
        </div>

        {/* Orders List Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center text-gray-500">
            <FiBox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Ingen spesialbestillinger ennå</p>
            <p className="text-sm">
              Kundetilpassede ordre vil vises her når de kommer inn
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
