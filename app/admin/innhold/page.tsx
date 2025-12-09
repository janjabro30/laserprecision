'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiFileText, FiEdit, FiHome } from 'react-icons/fi';

export default function ContentPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pages');

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
    { id: 'pages', name: 'Sider', icon: FiFileText },
    { id: 'blog', name: 'Blogg', icon: FiEdit },
    { id: 'homepage', name: 'Hjemmeside', icon: FiHome },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-dark">Innholdsadministrasjon</h2>
          <p className="text-gray-600 mt-1">Administrer nettsideinnhold</p>
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
            {activeTab === 'pages' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-dark">Sider</h3>
                  <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors">
                    Ny Side
                  </button>
                </div>
                <div className="space-y-2">
                  {['Om Oss', 'FAQ', 'Kontakt', 'Personvernerklæring', 'Vilkår', 'Retur'].map(
                    (page) => (
                      <div
                        key={page}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FiFileText className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-dark">{page}</span>
                        </div>
                        <button className="p-2 text-gray-600 hover:text-gold transition-colors">
                          <FiEdit className="w-5 h-5" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-dark">Blogginnlegg</h3>
                  <button className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors">
                    Nytt Innlegg
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <FiEdit className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Ingen blogginnlegg ennå</p>
                  <p className="text-sm">Opprett ditt første blogginnlegg</p>
                </div>
              </div>
            )}

            {activeTab === 'homepage' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-dark mb-4">Hjemmeside Redigering</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-dark mb-3">Hero Seksjon</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tittel
                        </label>
                        <input
                          type="text"
                          defaultValue="Laser Presisjon"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Undertittel
                        </label>
                        <input
                          type="text"
                          defaultValue="Profesjonell lasergravering for bedrifter og privatpersoner"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-dark mb-3">Fremhevede Produkter</h4>
                    <p className="text-sm text-gray-600">
                      Produkter merket som &quot;fremhevet&quot; vil vises på hjemmesiden.
                      Administrer dette fra Produktsiden.
                    </p>
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
