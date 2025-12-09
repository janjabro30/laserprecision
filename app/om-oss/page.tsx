import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Om Oss' }]} />

      <h1 className="text-4xl font-bold mb-8 text-gray-900">Om Oss</h1>

      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vår Historie</h2>
          <p className="text-gray-700 leading-relaxed">
            Laser Presisjon ble etablert i 2020 med et mål om å tilby høykvalitets lasergravering
            til både bedrifter og privatpersoner. Vi har utviklet oss fra en liten verksted til å
            bli en ledende leverandør av personlige graverte produkter i Norge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Våre Verdier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-900">Kvalitet</h3>
              <p className="text-gray-700">
                Vi bruker kun de beste materialene og mest avanserte laserteknologi for å sikre
                perfekte resultater hver gang.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-900">Service</h3>
              <p className="text-gray-700">
                Kundetilfredshet er vår høyeste prioritet. Vi jobber tett med hver kunde for å
                realisere deres visjon.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-900">Innovasjon</h3>
              <p className="text-gray-700">
                Vi holder oss oppdatert med de nyeste teknologiene og teknikker innen
                lasergravering.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Vårt Team</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vårt dedikerte team består av erfarne håndverkere og designere som brenner for
            kvalitet og presisjon. Vi tar stolthet i hver enkelt gravering vi produserer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Miljø og Bærekraft</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi er opptatt av miljøet og bruker bærekraftige materialer når det er mulig. Våre
            lasergraverings prosesser er energieffektive og produserer minimalt med avfall.
          </p>
        </section>
      </div>
    </div>
  );
}
