import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { formatDate } from '@/lib/utils/formatting';

const blogPosts = [
  {
    id: '1',
    title: 'Hvordan Velge Riktig Materiale for Lasergravering',
    slug: 'velge-riktig-materiale',
    excerpt: 'Lær om de forskjellige materialene vi kan gravere på og hvilke som passer best til ditt prosjekt.',
    coverImage: '/images/blog/materials.jpg',
    publishedAt: new Date('2024-12-01'),
    author: 'Laser Presisjon',
    category: 'Veiledning',
  },
  {
    id: '2',
    title: '5 Kreative Ideer til Personlige Gaver',
    slug: 'kreative-gaveideer',
    excerpt: 'Trenger du gaveinspirasjøn? Her er våre beste forslag til personlige, graverte gaver.',
    coverImage: '/images/blog/gifts.jpg',
    publishedAt: new Date('2024-11-20'),
    author: 'Laser Presisjon',
    category: 'Inspirasjon',
  },
  {
    id: '3',
    title: 'Vedlikehold av Graverte Treprodukter',
    slug: 'vedlikehold-treprodukter',
    excerpt: 'Slik holder du dine graverte treprodukter vakre og holdbare i mange år.',
    coverImage: '/images/blog/maintenance.jpg',
    publishedAt: new Date('2024-11-10'),
    author: 'Laser Presisjon',
    category: 'Tips',
  },
  {
    id: '4',
    title: 'Lasergravering for Bedrifter: Alt Du Trenger å Vite',
    slug: 'lasergravering-bedrifter',
    excerpt: 'Hvordan kan din bedrift dra nytte av profesjonell lasergravering? Vi forklarer mulighetene.',
    coverImage: '/images/blog/business.jpg',
    publishedAt: new Date('2024-10-28'),
    author: 'Laser Presisjon',
    category: 'Bedrift',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Blogg' }]} />

      <h1 className="text-4xl font-bold mb-4 text-gray-900">Blogg</h1>
      <p className="text-gray-600 mb-12">
        Tips, veiledninger og inspirasjon om lasergravering
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blogg/${post.slug}`}>
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                    {post.category}
                  </span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                <span className="text-blue-600 hover:underline font-medium">
                  Les mer →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
