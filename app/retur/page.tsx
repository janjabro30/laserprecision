import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Retningslinjer for Retur' }]} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900">Retningslinjer for Retur</h1>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">14 Dagers Angrerett</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            I henhold til norsk lov har du 14 dagers angrerett på standardprodukter fra du mottar
            varen. Dette gjelder ikke for produkter som er spesialtilpasset eller personalisert.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Betingelser for Retur</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Produktet må være ubrukt og i originalemballasje</li>
            <li>Returvaren må være i samme stand som da du mottok den</li>
            <li>Du må melde fra om retur innen 14 dager fra mottaksdato</li>
            <li>Produkter med lasergravering eller personalisering kan ikke returneres</li>
            <li>Du dekker returfrakt med mindre varen er defekt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Slik Returnerer Du</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Kontakt oss på post@laserpresisjon.no med ordrenummer</li>
            <li>Pakk varen forsvarlig i originalemballasje</li>
            <li>Send varen til adressen vi oppgir</li>
            <li>Vi refunderer beløpet innen 14 dager etter mottak</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Defekte Produkter</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dersom du mottar en defekt eller skadet vare, tar vi selvfølgelig alle kostnader.
            Kontakt oss umiddelbart, så sender vi deg en erstatning eller refunderer kjøpet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Refusjon</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Når vi har mottatt og godkjent returen, vil du motta refusjon til samme betalingsmetode
            som ble brukt ved kjøp. Dette skjer normalt innen 5-7 virkedager.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Unntak fra Angrerett</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Produkter laget etter dine spesifikasjoner</li>
            <li>Personaliserte eller graverte varer</li>
            <li>Produkter som er forseglet og ikke kan returneres av hygieniske årsaker</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kontakt Oss</h2>
          <p className="text-gray-700 leading-relaxed">
            Har du spørsmål om retur? Ta gjerne kontakt med oss på{' '}
            <a href="mailto:post@laserpresisjon.no" className="text-blue-600 hover:underline">
              post@laserpresisjon.no
            </a>{' '}
            eller ring oss på{' '}
            <a href="tel:+4712345678" className="text-blue-600 hover:underline">
              +47 123 45 678
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
