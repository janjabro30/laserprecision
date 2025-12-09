'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FiSettings, FiDollarSign, FiTruck, FiMail, 
  FiSearch 
} from 'react-icons/fi';

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

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

  const tabs = [
    { id: 'general', name: 'Generelt', icon: FiSettings },
    { id: 'payment', name: 'Betaling', icon: FiDollarSign },
    { id: 'shipping', name: 'Frakt', icon: FiTruck },
    { id: 'email', name: 'E-post', icon: FiMail },
    { id: 'seo', name: 'SEO', icon: FiSearch },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-dark">Innstillinger</h2>
          <p className="text-gray-600 mt-1">Konfigurer plattforminnstillinger</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-gold text-gold'
                        : 'border-transparent text-gray-600 hover:text-gold hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark mb-4">Generelle Innstillinger</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Firmanavn
                    </label>
                    <input
                      type="text"
                      defaultValue="Laser Presisjon AS"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-post
                    </label>
                    <input
                      type="email"
                      defaultValue="post@laserpresisjon.no"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      defaultValue="+47 123 45 678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                  Lagre Endringer
                </button>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark mb-4">Betalingsinnstillinger</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-dark">Stripe</h4>
                        <p className="text-sm text-gray-600">Kredittkort betalinger</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Stripe Public Key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <input
                        type="password"
                        placeholder="Stripe Secret Key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-dark">Vipps</h4>
                        <p className="text-sm text-gray-600">Norsk mobilbetaling</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Vipps Client ID"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <input
                        type="password"
                        placeholder="Vipps Client Secret"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                  Lagre Endringer
                </button>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark mb-4">Fraktinnstillinger</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-dark mb-4">Fraktleverandører</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Bring</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Posten</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Helthjem</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gratis frakt terskel (NOK)
                    </label>
                    <input
                      type="number"
                      defaultValue="500"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                  Lagre Endringer
                </button>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark mb-4">E-postinnstillinger</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avsender Navn
                    </label>
                    <input
                      type="text"
                      defaultValue="Laser Presisjon"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avsender E-post
                    </label>
                    <input
                      type="email"
                      defaultValue="post@laserpresisjon.no"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-dark mb-3">E-postvarslinger</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="form-checkbox text-gold" />
                        <span className="text-gray-700">Ordrebekreftelse</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="form-checkbox text-gold" />
                        <span className="text-gray-700">Ordre sendt</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="form-checkbox text-gold" />
                        <span className="text-gray-700">Hent i butikk</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="form-checkbox text-gold" />
                        <span className="text-gray-700">Spesialbestilling oppdatering</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                  Lagre Endringer
                </button>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-dark mb-4">SEO Innstillinger</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Meta Tittel
                    </label>
                    <input
                      type="text"
                      defaultValue="Laser Presisjon - Profesjonell Lasergravering"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Meta Beskrivelse
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Profesjonell lasergravering for bedrifter og privatpersoner. Høy kvalitet og rask levering."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      placeholder="123456789"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <button className="px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                  Lagre Endringer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
