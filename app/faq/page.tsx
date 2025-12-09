'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

const faqs = [
  {
    question: 'Hvor lang tid tar en lasergravering?',
    answer: 'For standardprodukter leverer vi innen 5-7 virkedager. Spesialbestillinger kan ta 10-14 virkedager avhengig av kompleksitet.',
  },
  {
    question: 'Hvilke materialer kan dere gravere på?',
    answer: 'Vi kan gravere på tre, metall (aluminium, rustfritt stål), akryl, skinn, glass og stein. Kontakt oss gjerne for å diskutere spesifikke materialer.',
  },
  {
    question: 'Kan jeg laste opp mitt eget design?',
    answer: 'Ja! Du kan laste opp dine egne bilder, logoer eller design gjennom vår spesialbestillingsside. Vi aksepterer PNG, JPG, SVG og PDF-filer.',
  },
  {
    question: 'Hva er returpolicyen deres?',
    answer: 'Vi tilbyr 14 dagers returrett på standardprodukter. Personlige eller tilpassede produkter kan ikke returneres med mindre det foreligger en produksjonsfeil.',
  },
  {
    question: 'Leverer dere til hele Norge?',
    answer: 'Ja, vi leverer til hele Norge. Leveringstiden er vanligvis 2-3 virkedager etter at produktet er ferdigstilt.',
  },
  {
    question: 'Kan jeg få en forhåndsvisning av graveringen?',
    answer: 'For spesialbestillinger sender vi en digital forhåndsvisning for godkjenning før vi starter produksjonen.',
  },
  {
    question: 'Tilbyr dere bedriftsrabatt?',
    answer: 'Ja, vi tilbyr attraktive priser for større bestillinger. Kontakt oss direkte for et tilbud.',
  },
  {
    question: 'Hva er minimumsbestilling?',
    answer: 'Det er ingen minimumsbestilling. Du kan bestille enkeltprodukter eller store kvantum.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'FAQ' }]} />

      <h1 className="text-4xl font-bold mb-4 text-gray-900">Ofte Stilte Spørsmål</h1>
      <p className="text-gray-600 mb-8">
        Her finner du svar på de vanligste spørsmålene om våre tjenester.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Fant du ikke svaret du lette etter?
        </h2>
        <p className="text-gray-700 mb-6">Ta gjerne kontakt med oss, så hjelper vi deg!</p>
        <a
          href="/kontakt"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Kontakt Oss
        </a>
      </div>
    </div>
  );
}
