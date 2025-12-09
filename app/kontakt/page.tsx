'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Takk for din henvendelse! Vi tar kontakt snart.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Kontakt Oss' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Kontakt Oss</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Send oss en melding</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Navn"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="E-post"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Telefon (valgfritt)"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Emne"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Melding
              </label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Melding
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Kontaktinformasjon</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Telefon</h4>
                <a
                  href="tel:+4712345678"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +47 123 45 678
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">E-post</h4>
                <a
                  href="mailto:post@laserpresisjon.no"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  post@laserpresisjon.no
                </a>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Adresse</h4>
                <a
                  href="https://maps.google.com/?q=Storgata+1,+0180+Oslo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-start"
                >
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Storgata 1<br />
                    0180 Oslo<br />
                    Norge
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Åpningstider</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Mandag - Fredag:</span>
                <span>09:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Lørdag:</span>
                <span>10:00 - 15:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Søndag:</span>
                <span className="text-gray-500">Stengt</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Besøk oss</h3>
            <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
              <p className="text-gray-500">Kart plassering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
