'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import { getProductById, getRelatedProducts } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatting';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Produktet finnes ikke</h1>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    alert('Produkt lagt til i handlekurven!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Produkter', href: '/produkter' },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
            <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <div key={idx} className="bg-gray-200 rounded h-20" />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 mb-6">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {variant.name}
                  </label>
                  <select
                    onChange={(e) =>
                      setSelectedVariants({ ...selectedVariants, [variant.id]: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Velg {variant.name.toLowerCase()}</option>
                    {variant.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antall
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✓ På lager</span>
            ) : (
              <span className="text-red-600 font-medium">✗ Utsolgt</span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full"
            disabled={!product.inStock}
          >
            Legg til i handlekurv
          </Button>

          {/* Product Details */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-semibold mb-3">Produktdetaljer</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Kategori: {product.category}</li>
              <li>• Levering: 5-7 virkedager</li>
              <li>• Returrett: 14 dager</li>
              <li>• Kvalitetsgaranti</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Relaterte Produkter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
