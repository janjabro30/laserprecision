'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { OrderStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatting';

export default function OrderTrackingPage() {
  const [trackingMethod, setTrackingMethod] = useState<'orderNumber' | 'email'>('orderNumber');
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderFound, setOrderFound] = useState(false);
  const [error, setError] = useState('');

  // Mock order data
  const mockOrder = {
    orderNumber: 'LP1234567890',
    email: 'kunde@example.com',
    status: 'Under produksjon' as OrderStatus,
    createdAt: new Date('2024-12-01'),
    estimatedDelivery: new Date('2024-12-15'),
    timeline: [
      { status: 'Mottatt' as OrderStatus, date: new Date('2024-12-01'), description: 'Ordre mottatt og bekreftet' },
      { status: 'Under produksjon' as OrderStatus, date: new Date('2024-12-05'), description: 'Gravering påbegynt' },
    ],
  };

  const handleTrack = () => {
    setError('');
    if (trackingMethod === 'orderNumber') {
      if (!orderNumber) {
        setError('Vennligst skriv inn ordrenummer');
        return;
      }
      // Mock check
      if (orderNumber === mockOrder.orderNumber) {
        setOrderFound(true);
      } else {
        setError('Ordre ikke funnet. Vennligst sjekk ordrenummeret.');
      }
    } else {
      if (!email) {
        setError('Vennligst skriv inn e-postadresse');
        return;
      }
      // Mock check
      if (email === mockOrder.email) {
        setOrderFound(true);
      } else {
        setError('Ingen ordre funnet for denne e-postadressen.');
      }
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    const completed = mockOrder.timeline.some(t => t.status === status);
    return completed ? '✓' : '○';
  };

  const getStatusColor = (status: OrderStatus) => {
    const completed = mockOrder.timeline.some(t => t.status === status);
    return completed ? 'text-green-600' : 'text-gray-400';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Spor Min Ordre' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Spor Min Ordre</h1>
      <p className="text-gray-600 mb-8">
        Følg med på status for din bestilling ved å bruke ordrenummer eller e-postadresse.
      </p>

      {!orderFound ? (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          {/* Tracking Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velg sporingsmetode
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  checked={trackingMethod === 'orderNumber'}
                  onChange={() => setTrackingMethod('orderNumber')}
                  className="mr-3"
                />
                <span>Ordrenummer</span>
              </label>
              <label className="flex items-center flex-1 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  checked={trackingMethod === 'email'}
                  onChange={() => setTrackingMethod('email')}
                  className="mr-3"
                />
                <span>E-postadresse</span>
              </label>
            </div>
          </div>

          {/* Input Field */}
          {trackingMethod === 'orderNumber' ? (
            <Input
              label="Ordrenummer"
              placeholder="f.eks. LP1234567890"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              error={error}
            />
          ) : (
            <Input
              label="E-postadresse"
              type="email"
              placeholder="din@epost.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
          )}

          <Button onClick={handleTrack} size="lg" className="w-full mt-6">
            Spor Ordre
          </Button>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">
              <strong>Tips:</strong> Du finner ordrenummeret i bekreftelsese-posten som ble sendt
              til deg etter bestilling.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Ordreinformasjon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Ordrenummer:</span>
                <p className="font-semibold">{mockOrder.orderNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <p className="font-semibold text-blue-600">{mockOrder.status}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Bestilt:</span>
                <p className="font-semibold">{formatDate(mockOrder.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Estimert levering:</span>
                <p className="font-semibold">{formatDate(mockOrder.estimatedDelivery)}</p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Ordrestatus</h2>
            <div className="space-y-6">
              {(['Mottatt', 'Under produksjon', 'Sendt', 'Levert'] as OrderStatus[]).map(
                (status, index) => (
                  <div key={status} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${getStatusColor(
                          status
                        )}`}
                      >
                        {getStatusIcon(status)}
                      </div>
                      {index < 3 && (
                        <div
                          className={`w-0.5 h-12 ${
                            mockOrder.timeline.some(t => t.status === status)
                              ? 'bg-green-600'
                              : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${getStatusColor(status)}`}>{status}</h3>
                      {mockOrder.timeline.find(t => t.status === status) && (
                        <p className="text-sm text-gray-600 mt-1">
                          {
                            mockOrder.timeline.find(t => t.status === status)?.description
                          }
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <Button variant="outline" onClick={() => setOrderFound(false)} className="w-full">
            Spor En Annen Ordre
          </Button>
        </div>
      )}
    </div>
  );
}
