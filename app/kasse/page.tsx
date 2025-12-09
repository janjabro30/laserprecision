'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils/formatting';
import { getAvailableShippingMethods } from '@/lib/utils/shipping';
import { getAvailablePaymentMethods } from '@/lib/utils/payment';
type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Delivery form state
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    postalCode: '',
    city: '',
    country: 'Norge',
  });

  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');

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

  // Mock config
  const shippingConfig = {
    bring: { apiKey: 'mock', customerId: 'mock', testMode: true },
    freeShippingThreshold: 500,
    defaultPackaging: { weight: 100, width: 20, height: 5, length: 30 },
  };

  const paymentConfig = {
    stripe: { publicKey: 'mock', secretKey: 'mock', webhookSecret: 'mock', testMode: true },
    vipps: { clientId: 'mock', clientSecret: 'mock', subscriptionKey: 'mock', merchantSerialNumber: 'mock', testMode: true },
    klarna: { username: 'mock', password: 'mock', region: 'eu' as const, testMode: true },
  };

  const shippingMethods = getAvailableShippingMethods(shippingConfig);
  const paymentMethods = getAvailablePaymentMethods(paymentConfig);

  const selectedShippingMethod = shippingMethods.find(m => m.id === selectedShipping);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrappingCost = giftWrapping ? 49 : 0;
  const shippingCost = selectedShippingMethod?.price || 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + giftWrappingCost + shippingCost - discount;

  const steps = [
    { id: 'cart', name: 'Handlekurv', icon: '🛒' },
    { id: 'delivery', name: 'Levering', icon: '📦' },
    { id: 'payment', name: 'Betaling', icon: '💳' },
    { id: 'confirmation', name: 'Bekreftelse', icon: '✓' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNextStep = () => {
    if (currentStep === 'cart') {
      setCurrentStep('delivery');
    } else if (currentStep === 'delivery') {
      if (!selectedShipping) {
        alert('Vennligst velg leveringsmetode');
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      if (!selectedPayment) {
        alert('Vennligst velg betalingsmetode');
        return;
      }
      if (!termsAccepted) {
        alert('Du må godta vilkårene for å fortsette');
        return;
      }
      setCurrentStep('confirmation');
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
    } else {
      alert('Ugyldig kampanjekode');
    }
  };

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Kasse' }]} />

        <h1 className="text-4xl font-bold mb-8 text-dark">Kasse</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                      index <= currentStepIndex
                        ? 'bg-gold text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gold' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                      index < currentStepIndex ? 'bg-gold' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cart Step */}
            {currentStep === 'cart' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <h2 className="text-2xl font-bold mb-6 text-dark gold-divider pb-4">
                    Dine produkter
                  </h2>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="w-full md:w-24 h-24 bg-gold-50 rounded flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.variant}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded border border-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                              -
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button className="w-8 h-8 rounded border border-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                              +
                            </button>
                          </div>
                          <button className="text-red-600 text-sm hover:underline">Fjern</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gold">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Options */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <h3 className="font-semibold text-lg mb-4 text-dark">Gavealternativer</h3>
                  
                  <label className="flex items-center mb-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={giftWrapping}
                      onChange={(e) => setGiftWrapping(e.target.checked)}
                      className="mr-3 w-5 h-5 accent-gold"
                    />
                    <span className="group-hover:text-gold transition-colors">
                      Gaveinnpakning (+{formatPrice(49)})
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-dark">
                      Gavekort melding (valgfritt)
                    </label>
                    <textarea
                      placeholder="Skriv en personlig melding..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Step */}
            {currentStep === 'delivery' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <h2 className="text-2xl font-bold mb-6 text-dark gold-divider pb-4">
                    Leveringsinformasjon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Fornavn *"
                      value={deliveryInfo.firstName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })}
                      required
                    />
                    <Input
                      label="Etternavn *"
                      value={deliveryInfo.lastName}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })}
                      required
                    />
                    <Input
                      label="E-post *"
                      type="email"
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                      required
                    />
                    <Input
                      label="Telefon *"
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      required
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Adresse *"
                        value={deliveryInfo.address1}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Adresse 2 (valgfritt)"
                        value={deliveryInfo.address2}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address2: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Postnummer *"
                      value={deliveryInfo.postalCode}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                      required
                    />
                    <Input
                      label="By *"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Shipping Methods */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <h3 className="font-semibold text-lg mb-4 text-dark">Velg leveringsmetode</h3>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedShipping === method.id
                            ? 'border-gold bg-gold-50'
                            : 'border-gray-200 hover:border-gold-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="mr-4 accent-gold"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-dark">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gold">{formatPrice(method.price)}</div>
                          <div className="text-xs text-gray-500">
                            {method.estimatedDays === 0 ? 'I dag' : `${method.estimatedDays} dager`}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <h2 className="text-2xl font-bold mb-6 text-dark gold-divider pb-4">
                    Betalingsmetode
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-gold bg-gold-50'
                            : 'border-gray-200 hover:border-gold-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="mr-4 accent-gold"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-dark">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-gold-200 transition-all">
                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mr-3 mt-1 w-5 h-5 accent-gold"
                    />
                    <span className="text-sm group-hover:text-gold transition-colors">
                      Jeg godtar{' '}
                      <Link href="/vilkar" className="text-gold underline">
                        vilkårene
                      </Link>{' '}
                      og{' '}
                      <Link href="/personvernerklaering" className="text-gold underline">
                        personvernerklæringen
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {currentStep === 'confirmation' && (
              <div className="animate-fade-in">
                <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-gold">
                  <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-dark">Takk for din bestilling!</h2>
                  <p className="text-gray-600 mb-2">Ordrenummer: <span className="font-bold text-gold">#12345</span></p>
                  <p className="text-gray-600 mb-6">
                    Du vil motta en bekreftelse på e-post til {deliveryInfo.email}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/spor-ordre">
                      <Button variant="gold" size="lg">Spor Min Ordre</Button>
                    </Link>
                    <Link href="/produkter">
                      <Button variant="outline" size="lg">Fortsett Handle</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20 border-2 border-gold-200">
              <h2 className="text-xl font-semibold mb-4 text-dark">Oppsummering</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gold-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Produkter:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {giftWrappingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gaveinnpakning:</span>
                    <span className="font-medium">{formatPrice(giftWrappingCost)}</span>
                  </div>
                )}
                {shippingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frakt:</span>
                    <span className="font-medium">{formatPrice(shippingCost)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Rabatt:</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>

              {/* Promo Code */}
              {currentStep !== 'confirmation' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-dark">Kampanjekode</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Skriv kode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? '✓' : 'Bruk'}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-2">✓ Kampanjekode brukt</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {currentStep !== 'confirmation' && (
                <div className="space-y-3">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={handleNextStep}
                  >
                    {currentStep === 'cart' && 'Gå til Levering'}
                    {currentStep === 'delivery' && 'Gå til Betaling'}
                    {currentStep === 'payment' && 'Fullfør Bestilling'}
                  </Button>

                  {currentStep !== 'cart' && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        if (currentStep === 'delivery') setCurrentStep('cart');
                        else if (currentStep === 'payment') setCurrentStep('delivery');
                      }}
                    >
                      Tilbake
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
