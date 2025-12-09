'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiStar } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: string;
  sku?: string;
  inStock: boolean;
  featured: boolean;
  visibility: string;
  createdAt: string;
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Er du sikker på at du vil slette "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Feil ved sletting av produkt');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Feil ved sletting av produkt');
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentValue }),
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, featured: !currentValue } : p
        ));
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const toggleVisibility = async (id: string, currentValue: string) => {
    const newValue = currentValue === 'published' ? 'draft' : 'published';
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: newValue }),
      });

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, visibility: newValue } : p
        ));
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const filteredProducts = products.filter(p => {
    if (filter === 'featured') return p.featured;
    if (filter === 'draft') return p.visibility === 'draft';
    if (filter === 'outofstock') return !p.inStock;
    return true;
  });

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-dark">Produkter</h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} produkt{filteredProducts.length !== 1 ? 'er' : ''}
            </p>
          </div>
          <Link href="/admin/produkter/ny">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold-600 transition-colors shadow-md">
              <FiPlus className="w-5 h-5" />
              <span>Nytt Produkt</span>
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'featured'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fremhevet
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'draft'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Utkast
            </button>
            <button
              onClick={() => setFilter('outofstock')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'outofstock'
                  ? 'bg-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Utsolgt
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gold">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Produkt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pris
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Ingen produkter funnet
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-dark">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {product.sku || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-dark">{product.price} kr</p>
                          {product.salePrice && (
                            <p className="text-sm text-red-600">{product.salePrice} kr</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gold-50 text-gold rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {product.featured && (
                            <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.visibility === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {product.visibility === 'published' ? 'Publisert' : 'Utkast'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleFeatured(product.id, product.featured)}
                            className="p-2 text-gray-600 hover:text-yellow-500 transition-colors"
                            title="Fremhev produkt"
                          >
                            <FiStar className={product.featured ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => toggleVisibility(product.id, product.visibility)}
                            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            title="Endre synlighet"
                          >
                            {product.visibility === 'published' ? <FiEye /> : <FiEyeOff />}
                          </button>
                          <Link
                            href={`/admin/produkter/${product.id}`}
                            className="p-2 text-gray-600 hover:text-gold transition-colors"
                            title="Rediger"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Slett"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
