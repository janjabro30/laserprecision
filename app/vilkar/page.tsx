import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Vilkår og Betingelser' }]} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900">Vilkår og Betingelser</h1>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Generelle Vilkår</h2>
          <p className="text-gray-700 leading-relaxed">
            Velkommen til Laser Presisjon. Ved å bruke vår nettside og tjenester godtar du disse
            vilkårene og betingelsene. Vennligst les dem nøye.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Bestilling og Betaling</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Alle priser er oppgitt i norske kroner (NOK) inkludert mva</li>
            <li>Vi aksepterer betalingskort og Vipps</li>
            <li>Betaling må være fullført før vi starter produksjon</li>
            <li>Vi forbeholder oss retten til å avslå bestillinger</li>
            <li>En ordrebekreftelse sendes til din e-post etter fullført kjøp</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Levering</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Leveringstider er estimater og er ikke garantert. Vi leverer til hele Norge.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Standardprodukter: 5-7 virkedager</li>
            <li>Spesialbestillinger: 10-14 virkedager</li>
            <li>Kunden er ansvarlig for å oppgi korrekt leveringsadresse</li>
            <li>Forsinkelser på grunn av force majeure er ikke vårt ansvar</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Produkter og Tjenester</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Vi streber etter nøyaktig gjengivelse av produkter</li>
            <li>Farger kan variere fra skjermbilder til fysisk produkt</li>
            <li>Alle graverte produkter er håndlaget og kan ha små variasjoner</li>
            <li>Vi er ikke ansvarlige for feil i kundens opplastede filer</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Immaterielle Rettigheter</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Alt innhold på vår nettside, inkludert tekst, bilder, logoer og design, er beskyttet
            av opphavsrett.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Kunden er ansvarlig for at opplastede design ikke krenker opphavsrett</li>
            <li>Vi forbeholder oss retten til å nekte gravering av beskyttet materiale</li>
            <li>Ved brudd på opphavsrett holdes kunden ansvarlig</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Ansvarsbegrensning</h2>
          <p className="text-gray-700 leading-relaxed">
            Laser Presisjon er ikke ansvarlig for indirekte tap eller følgeskader som følge av bruk
            av våre produkter eller tjenester. Vårt ansvar er begrenset til produktets kjøpesum.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Reklamasjoner</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Produkter må kontrolleres ved mottak. Reklamasjoner må meldes innen rimelig tid.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Kontakt oss umiddelbart ved feil eller mangler</li>
            <li>Ta bilder av eventuelle skader</li>
            <li>Produkter må returneres i samme stand som mottatt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Personvern</h2>
          <p className="text-gray-700 leading-relaxed">
            Les vår{' '}
            <a href="/personvernerklaering" className="text-blue-600 hover:underline">
              personvernerklæring
            </a>{' '}
            for informasjon om hvordan vi behandler dine personopplysninger.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Endringer i Vilkår</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi forbeholder oss retten til å endre disse vilkårene når som helst. Endringer trer i
            kraft umiddelbart ved publisering på nettsiden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Gjeldende Lov</h2>
          <p className="text-gray-700 leading-relaxed">
            Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal løses i norske domstoler.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            Har du spørsmål om våre vilkår? Kontakt oss på{' '}
            <a href="mailto:post@laserpresisjon.no" className="text-blue-600 hover:underline">
              post@laserpresisjon.no
            </a>
            .
          </p>
          <p className="text-gray-600 text-sm mt-4">Sist oppdatert: Desember 2024</p>
        </section>
      </div>
    </div>
  );
}
