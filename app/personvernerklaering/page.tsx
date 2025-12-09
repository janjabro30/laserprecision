import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Personvernerklæring' }]} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900">Personvernerklæring</h1>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Laser Presisjon er opptatt av ditt personvern. Denne erklæringen forklarer hvordan vi
          samler inn, bruker og beskytter dine personopplysninger i samsvar med GDPR.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Hvilke Opplysninger Samler Vi Inn</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Navn og kontaktinformasjon (e-post, telefon, adresse)</li>
            <li>Bestillingsinformasjon og preferanser</li>
            <li>Betalingsinformasjon (behandles gjennom sikre betalingsleverandører)</li>
            <li>Teknisk informasjon (IP-adresse, nettlesertype)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Hvordan Bruker Vi Opplysningene</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Behandle og levere din bestilling</li>
            <li>Kommunisere med deg om din ordre</li>
            <li>Forbedre våre tjenester og kundeopplevelse</li>
            <li>Sende deg markedsføring (kun med ditt samtykke)</li>
            <li>Oppfylle juridiske forpliktelser</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Deling av Opplysninger</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vi deler aldri dine personopplysninger med tredjeparter for markedsføringsformål uten
            ditt samtykke. Vi kan dele informasjon med:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Leverandører og logistikkpartnere for å fullføre din bestilling</li>
            <li>Betalingsleverandører for å behandle transaksjoner</li>
            <li>Offentlige myndigheter når loven krever det</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dine Rettigheter</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            I henhold til GDPR har du følgende rettigheter:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Rett til innsyn i dine personopplysninger</li>
            <li>Rett til retting av uriktige opplysninger</li>
            <li>Rett til sletting (&quot;retten til å bli glemt&quot;)</li>
            <li>Rett til begrensning av behandling</li>
            <li>Rett til dataportabilitet</li>
            <li>Rett til å protestere mot behandling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Informasjonskapsler (Cookies)</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi bruker informasjonskapsler for å forbedre din opplevelse på nettsiden. Du kan når
            som helst endre dine innstillinger for informasjonskapsler i nettleseren din.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Sikkerhet</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi bruker industristandarder for å beskytte dine personopplysninger, inkludert
            kryptering og sikre servere. Ingen metode for overføring over internett er 100% sikker,
            men vi jobber kontinuerlig for å beskytte dine data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Lagringstid</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi lagrer dine personopplysninger så lenge det er nødvendig for å oppfylle formålene
            beskrevet i denne erklæringen, eller så lenge loven krever det.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kontakt Oss</h2>
          <p className="text-gray-700 leading-relaxed">
            Har du spørsmål om personvern eller ønsker å utøve dine rettigheter, kan du kontakte
            oss på{' '}
            <a href="mailto:personvern@laserpresisjon.no" className="text-blue-600 hover:underline">
              personvern@laserpresisjon.no
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Endringer i Personvernerklæringen</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi kan oppdatere denne erklæringen fra tid til annen. Eventuelle endringer vil bli
            publisert på denne siden med oppdatert dato.
          </p>
          <p className="text-gray-600 text-sm mt-4">Sist oppdatert: Desember 2024</p>
        </section>
      </div>
    </div>
  );
}
