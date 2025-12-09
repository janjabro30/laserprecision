// Sample product data for Laser Presisjon
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Personlig Navneskilt',
    description: 'Elegant navneskilt i tre med lasergravering. Perfekt til kontoret eller hjemmet.',
    price: 299,
    images: ['/images/products/nameplate-1.jpg', '/images/products/nameplate-2.jpg'],
    category: 'Navneskilt',
    inStock: true,
    featured: true,
    variants: [
      {
        id: 'v1',
        name: 'Materiale',
        type: 'material',
        options: ['Eik', 'Valnøtt', 'Bjørk'],
        priceModifier: 0,
      },
      {
        id: 'v2',
        name: 'Størrelse',
        type: 'size',
        options: ['Liten (15x5cm)', 'Medium (20x7cm)', 'Stor (25x10cm)'],
        priceModifier: 50,
      },
    ],
    seoTitle: 'Personlig Navneskilt med Lasergravering | Laser Presisjon',
    seoDescription: 'Bestill ditt eget personlige navneskilt i tre med lasergravering. Høy kvalitet og rask levering.',
  },
  {
    id: 'p2',
    name: 'Graverte Nøkkelringer',
    description: 'Praktisk nøkkelring i metall eller tre med din egen tekst eller logo.',
    price: 149,
    images: ['/images/products/keyring-1.jpg', '/images/products/keyring-2.jpg'],
    category: 'Tilbehør',
    inStock: true,
    featured: true,
    variants: [
      {
        id: 'v3',
        name: 'Materiale',
        type: 'material',
        options: ['Aluminium', 'Rustfritt stål', 'Tre'],
      },
      {
        id: 'v4',
        name: 'Form',
        type: 'size',
        options: ['Rund', 'Firkantet', 'Hjerte'],
      },
    ],
    seoTitle: 'Graverte Nøkkelringer med Lasergravering | Laser Presisjon',
    seoDescription: 'Personlige nøkkelringer med lasergravering. Perfekt som gave eller merch.',
  },
  {
    id: 'p3',
    name: 'Julebrett i Tre',
    description: 'Vakkert julebrett med lasergraverte motiver. Perfekt til høytiden.',
    price: 599,
    images: ['/images/products/christmas-board-1.jpg'],
    category: 'Høytid',
    inStock: true,
    featured: true,
    seoTitle: 'Graverte Julebrett i Tre | Laser Presisjon',
    seoDescription: 'Nydelige julebrett med lasergravering. Legg til julestemning i hjemmet ditt.',
  },
  {
    id: 'p4',
    name: 'Firma Logo Skilt',
    description: 'Profesjonelt firmaskilt med lasergravering av din logo. Ideelt for bedrifter.',
    price: 1499,
    images: ['/images/products/company-sign-1.jpg', '/images/products/company-sign-2.jpg'],
    category: 'Bedrift',
    inStock: true,
    variants: [
      {
        id: 'v5',
        name: 'Størrelse',
        type: 'size',
        options: ['30x20cm', '50x30cm', '70x40cm'],
        priceModifier: 500,
      },
    ],
    seoTitle: 'Firma Logo Skilt med Lasergravering | Laser Presisjon',
    seoDescription: 'Profesjonelle firmaskilt med lasergravering. Perfekt for bedrifter og kontorer.',
  },
  {
    id: 'p5',
    name: 'Minneplate med Bilde',
    description: 'Rørende minneplate i tre med lasergravering av bilde og tekst.',
    price: 799,
    images: ['/images/products/memorial-plate-1.jpg'],
    category: 'Minnegaver',
    inStock: true,
    seoTitle: 'Minneplate med Lasergravering | Laser Presisjon',
    seoDescription: 'Vakre minneplater med lasergravering av bilder og tekst. En verdig gave.',
  },
  {
    id: 'p6',
    name: 'Personlig Skjærebrett',
    description: 'Høykvalitets skjærebrett i tre med personlig gravering.',
    price: 449,
    images: ['/images/products/cutting-board-1.jpg', '/images/products/cutting-board-2.jpg'],
    category: 'Kjøkken',
    inStock: true,
    featured: false,
    variants: [
      {
        id: 'v6',
        name: 'Materiale',
        type: 'material',
        options: ['Bambus', 'Eik', 'Valnøtt'],
      },
    ],
    seoTitle: 'Personlig Skjærebrett med Gravering | Laser Presisjon',
    seoDescription: 'Skjærebrett i tre med personlig lasergravering. Perfekt til kjøkkenet.',
  },
];

export const categories = [
  'Alle',
  'Navneskilt',
  'Tilbehør',
  'Høytid',
  'Bedrift',
  'Minnegaver',
  'Kjøkken',
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'Alle') return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getRelatedProducts(productId: string, limit: number = 3): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  const related = products.filter(
    p => p.id !== productId && p.category === product.category
  );
  
  return related.slice(0, limit);
}
