'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiShoppingBag, FiDollarSign, FiTrendingUp, 
  FiPackage, FiAlertTriangle, FiUsers 
} from 'react-icons/fi';

interface DashboardStats {
  ordersToday: number;
  revenue: number;
  pendingOrders: number;
  lowStockItems: number;
  totalCustomers: number;
  specialOrders: number;
}

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    ordersToday: 0,
    revenue: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    totalCustomers: 0,
    specialOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Laster...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const statCards = [
    {
      title: 'Ordre I Dag',
      value: stats.ordersToday,
      icon: FiShoppingBag,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      title: 'Inntekt (Måned)',
      value: `${stats.revenue.toFixed(0)} kr`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
    {
      title: 'Ventende Ordre',
      value: stats.pendingOrders,
      icon: FiPackage,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      title: 'Lav Lagerbeholdning',
      value: stats.lowStockItems,
      icon: FiAlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-500',
    },
    {
      title: 'Totalt Kunder',
      value: stats.totalCustomers,
      icon: FiUsers,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
    },
    {
      title: 'Spesialbestillinger',
      value: stats.specialOrders,
      icon: FiTrendingUp,
      color: 'bg-gold',
      textColor: 'text-gold',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-3xl font-bold text-dark mb-2">
            Velkommen tilbake! 👋
          </h2>
          <p className="text-gray-600">
            Her er en oversikt over din virksomhet
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-xl transition-shadow duration-300"
                style={{ borderLeftColor: card.color.replace('bg-', '#') }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-dark">
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-dark mb-4">Hurtighandlinger</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/admin/produkter/ny')}
              className="p-4 bg-gold-50 border-2 border-gold rounded-lg hover:bg-gold hover:text-white transition-all duration-300 text-left"
            >
              <FiPackage className="w-6 h-6 mb-2" />
              <p className="font-semibold">Nytt Produkt</p>
            </button>
            <button
              onClick={() => router.push('/admin/bestillinger')}
              className="p-4 bg-blue-50 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-left"
            >
              <FiShoppingBag className="w-6 h-6 mb-2" />
              <p className="font-semibold">Se Ordre</p>
            </button>
            <button
              onClick={() => router.push('/admin/lagerbeholdning')}
              className="p-4 bg-red-50 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 text-left"
            >
              <FiAlertTriangle className="w-6 h-6 mb-2" />
              <p className="font-semibold">Lav Beholdning</p>
            </button>
            <button
              onClick={() => router.push('/admin/rapporter')}
              className="p-4 bg-green-50 border-2 border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 text-left"
            >
              <FiTrendingUp className="w-6 h-6 mb-2" />
              <p className="font-semibold">Rapporter</p>
            </button>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-dark mb-4">Siste Aktivitet</h3>
          <p className="text-gray-600 text-center py-8">
            Siste ordre og hendelser vil vises her
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
