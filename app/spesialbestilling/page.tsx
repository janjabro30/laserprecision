'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import { isFutureDate } from '@/lib/utils/formatting';
import { useToast } from '@/lib/utils/useToast';

type Step = 1 | 2 | 3 | 4;

interface OrderData {
  material: string;
  engravingStyle: string;
  font: string;
  description: string;
  uploadedImages: string[];
  email: string;
  preferredDate: string;
}

export default function SpecialOrderPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [orderData, setOrderData] = useState<OrderData>({
    material: '',
    engravingStyle: '',
    font: '',
    description: '',
    uploadedImages: [],
    email: '',
    preferredDate: '',
  });
  const [dateError, setDateError] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  const materials = ['Tre - Eik', 'Tre - Valnøtt', 'Tre - Bjørk', 'Aluminium', 'Rustfritt Stål', 'Akryl', 'Skinn'];
  const engravingStyles = ['Gravering', 'Kutt', 'Markering', 'Kombinasjon'];
  const fonts = ['Arial', 'Times New Roman', 'Helvetica', 'Courier', 'Skript'];

  const validateDate = (dateString: string): boolean => {
    if (!dateString) {
      setDateError('Vennligst velg en dato');
      return false;
    }

    const selectedDate = new Date(dateString);
    if (!isFutureDate(selectedDate)) {
      setDateError('Datoen må være i fremtiden. Tidligere datoer er ikke tillatt.');
      return false;
    }

    setDateError('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 3 && !validateDate(orderData.preferredDate)) {
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setOrderData({ ...orderData, uploadedImages: [...orderData.uploadedImages, ...fileNames] });
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('specialOrderDraft', JSON.stringify(orderData));
    showToast('Utkast lagret! Du kan fortsette senere fra "Mine Utkast".', 'success');
  };

  const handleSubmit = () => {
    showToast('Spesialbestilling sendt! Vi tar kontakt med deg snart.', 'success');
    setOrderData({
      material: '',
      engravingStyle: '',
      font: '',
      description: '',
      uploadedImages: [],
      email: '',
      preferredDate: '',
    });
    setCurrentStep(1);
  };

  const estimatedPrice = () => {
    let price = 500; // Base price
    if (orderData.material.includes('Stål')) price += 300;
    if (orderData.engravingStyle === 'Kombinasjon') price += 200;
    return price;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Spesialbestilling' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Spesialbestilling</h1>
      <p className="text-gray-600 mb-8">Lag din egen tilpassede lasergravering i 4 enkle steg.</p>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`h-1 w-full ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ marginTop: '-1.25rem', zIndex: -1 }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-center flex-1">Materiale</span>
          <span className="text-center flex-1">Design</span>
          <span className="text-center flex-1">Dato & Info</span>
          <span className="text-center flex-1">Oppsummering</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md min-h-[400px]">
        {/* Step 1: Material Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Steg 1: Velg Materiale</h2>
            <div className="space-y-3">
              {materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="material"
                    value={material}
                    checked={orderData.material === material}
                    onChange={(e) =>
                      setOrderData({ ...orderData, material: e.target.value })
                    }
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">{material}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                <strong>Tips:</strong> Tre gir en varm, naturlig følelse, mens metall er mer
                holdbart og moderne.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Design */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Steg 2: Design & Stil</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graveringsstil
              </label>
              <select
                value={orderData.engravingStyle}
                onChange={(e) =>
                  setOrderData({ ...orderData, engravingStyle: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Velg stil</option>
                {engravingStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
              <select
                value={orderData.font}
                onChange={(e) => setOrderData({ ...orderData, font: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Velg font</option>
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last opp bilder/design (drag-and-drop eller klikk)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Klikk for å laste opp eller dra og slipp
                  </p>
                </label>
              </div>
              {orderData.uploadedImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700 font-medium">Opplastede filer:</p>
                  <ul className="text-sm text-gray-600 mt-2">
                    {orderData.uploadedImages.map((img, idx) => (
                      <li key={idx}>• {img}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivelse av bestillingen
              </label>
              <textarea
                value={orderData.description}
                onChange={(e) =>
                  setOrderData({ ...orderData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Beskriv dine ønsker og spesifikke detaljer..."
              />
            </div>
          </div>
        )}

        {/* Step 3: Date & Contact Info */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Steg 3: Dato & Kontaktinformasjon
            </h2>

            <div className="mb-6">
              <Input
                label="E-postadresse"
                type="email"
                value={orderData.email}
                onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                required
                placeholder="din@epost.no"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ønsket leveringsdato *
              </label>
              <input
                type="date"
                value={orderData.preferredDate}
                onChange={(e) =>
                  setOrderData({ ...orderData, preferredDate: e.target.value })
                }
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  dateError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {dateError && <p className="mt-1 text-sm text-red-600">{dateError}</p>}
              <p className="mt-2 text-sm text-gray-600">
                Vi leverer vanligvis innen 10-14 virkedager for spesialbestillinger.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Viktig:</strong> Tidligere datoer er ikke tillatt. Vennligst velg en
                fremtidig dato.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Steg 4: Oppsummering & Bekreftelse
            </h2>

            <div className="space-y-4 mb-6">
              <div className="border-b pb-3">
                <span className="font-semibold">Materiale:</span> {orderData.material || 'Ikke valgt'}
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">Graveringsstil:</span>{' '}
                {orderData.engravingStyle || 'Ikke valgt'}
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">Font:</span> {orderData.font || 'Ikke valgt'}
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">Opplastede filer:</span>{' '}
                {orderData.uploadedImages.length} fil(er)
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">Beskrivelse:</span>{' '}
                {orderData.description || 'Ingen beskrivelse'}
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">E-post:</span> {orderData.email}
              </div>
              <div className="border-b pb-3">
                <span className="font-semibold">Ønsket dato:</span> {orderData.preferredDate}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Estimert pris:</span>
                <span className="text-2xl font-bold text-blue-600">
                  Fra {estimatedPrice()} NOK
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Endelig pris bekreftes etter gjennomgang av bestillingen.
              </p>
            </div>

            <Button onClick={handleSubmit} size="lg" className="w-full">
              Send Bestilling
            </Button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentStep === 1}
          className="w-full sm:w-auto"
        >
          Forrige
        </Button>
        <Button onClick={handleSaveDraft} variant="secondary" className="w-full sm:w-auto">
          Lagre Utkast
        </Button>
        {currentStep < 4 && (
          <Button onClick={handleNext} className="w-full sm:w-auto">
            Neste
          </Button>
        )}
      </div>

      {/* Link to Drafts */}
      <div className="mt-8 text-center">
        <a href="/spesialbestilling/mine-utkast" className="text-blue-600 hover:underline">
          Gå til Mine Utkast →
        </a>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
