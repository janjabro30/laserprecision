import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/formatting';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = product.featured; // Using featured as proxy for "new" products
  
  return (
    <Link href={`/produkter/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-gold">
        <div className="relative h-48 bg-gold-50">
          {/* Placeholder for product image */}
          <div className="absolute inset-0 flex items-center justify-center text-gold-300">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              Utsolgt
            </div>
          )}
          {isNew && product.inStock && (
            <div className="absolute top-3 left-3 bg-gold text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg shimmer-effect">
              Ny
            </div>
          )}
          {/* Gold overlay on hover */}
          <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg text-dark mb-2 group-hover:text-gold transition-colors duration-300">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gold">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500 bg-gold-50 px-2 py-1 rounded">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
