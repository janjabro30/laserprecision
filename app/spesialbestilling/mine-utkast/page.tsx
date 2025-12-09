'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

interface DraftData {
  material?: string;
  engravingStyle?: string;
  font?: string;
  description?: string;
  email?: string;
  preferredDate?: string;
}

export default function MyDraftsPage() {
  const [draft, setDraft] = useState<DraftData | null>(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem('specialOrderDraft');
    if (savedDraft) {
      setDraft(JSON.parse(savedDraft));
    }
  }, []);

  const handleDeleteDraft = () => {
    localStorage.removeItem('specialOrderDraft');
    setDraft(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: 'Spesialbestilling', href: '/spesialbestilling' },
          { label: 'Mine Utkast' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8 text-gray-900">Mine Utkast</h1>

      {!draft ? (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ingen lagrede utkast</h2>
          <p className="text-gray-600 mb-6">
            Du har ingen lagrede spesialbestillinger ennå.
          </p>
          <Link href="/spesialbestilling">
            <Button>Start Ny Bestilling</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Lagret Utkast</h2>
            <Button variant="outline" onClick={handleDeleteDraft}>
              Slett
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <span className="font-medium">Materiale:</span> {draft.material || 'Ikke valgt'}
            </div>
            <div>
              <span className="font-medium">Graveringsstil:</span>{' '}
              {draft.engravingStyle || 'Ikke valgt'}
            </div>
            <div>
              <span className="font-medium">Font:</span> {draft.font || 'Ikke valgt'}
            </div>
            <div>
              <span className="font-medium">Beskrivelse:</span>{' '}
              {draft.description || 'Ingen beskrivelse'}
            </div>
            <div>
              <span className="font-medium">E-post:</span> {draft.email || 'Ikke angitt'}
            </div>
            <div>
              <span className="font-medium">Ønsket dato:</span>{' '}
              {draft.preferredDate || 'Ikke valgt'}
            </div>
          </div>

          <Link href="/spesialbestilling">
            <Button className="w-full">Fortsett Bestilling</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
