'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/formatting';

export default function ShoppingCartPage() {
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftCard, setGiftCard] = useState('');

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      name: 'Personlig Navneskilt',
      price: 299,
      quantity: 1,
      variant: 'Eik, Medium',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrappingCost = giftWrapping ? 49 : 0;
  const total = subtotal + giftWrappingCost;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Handlekurv' }]} />

      <h1 className="text-3xl font-bold mb-8 text-gray-900">Handlekurv</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Handlekurven er tom</h2>
          <p className="text-gray-600 mb-6">Du har ingen produkter i handlekurven ennå.</p>
          <Link href="/produkter">
            <Button>Se Produkter</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-32 h-32 bg-gray-200 rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.variant}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded border flex items-center justify-center">
                          -
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button className="w-8 h-8 rounded border flex items-center justify-center">
                          +
                        </button>
                      </div>
                      <button className="text-red-600 text-sm hover:underline">Fjern</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-blue-600">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Oppsummering</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {giftWrappingCost > 0 && (
                  <div className="flex justify-between">
                    <span>Gaveinnpakning:</span>
                    <span>{formatPrice(giftWrappingCost)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Gift Options */}
              <div className="border-t pt-4 mb-4">
                <h3 className="font-semibold mb-3">Gavealternativer</h3>
                
                <label className="flex items-center mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Gaveinnpakning (+{formatPrice(49)})</span>
                </label>

                <div>
                  <label className="block text-sm font-medium mb-2">Gavekort</label>
                  <input
                    type="text"
                    placeholder="Skriv inn gavekortmelding"
                    value={giftCard}
                    onChange={(e) => setGiftCard(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Valgfritt: Legg til en personlig melding</p>
                </div>
              </div>

              <Button size="lg" className="w-full">
                Gå til Kasse
              </Button>

              <Link href="/produkter">
                <Button variant="outline" className="w-full mt-3">
                  Fortsett Handle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
