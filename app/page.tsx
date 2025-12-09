import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { getFeaturedProducts } from '@/lib/data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Laser Presisjon
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Profesjonell lasergravering for bedrifter og privatpersoner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produkter">
                <Button size="lg" className="w-full sm:w-auto">
                  Se Produkter
                </Button>
              </Link>
              <Link href="/spesialbestilling">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                  Spesialbestilling
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Populære Produkter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/produkter">
              <Button size="lg">Se Alle Produkter</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Våre Tjenester
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Høy Presisjon</h3>
              <p className="text-gray-600">
                Vi bruker avansert laserteknologi for perfekt presisjon i hver gravering.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rask Levering</h3>
              <p className="text-gray-600">
                Levering på 5-7 virkedager for standardprodukter, 10-14 dager for spesialbestillinger.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-blue-600 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Høy Kvalitet</h3>
              <p className="text-gray-600">
                Alle produkter er kvalitetskontrollert og kommer med garantI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Har du en spesiell idé?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Vi hjelper deg med å realisere dine egne design og ideer
          </p>
          <Link href="/spesialbestilling">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Spesialbestilling
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
