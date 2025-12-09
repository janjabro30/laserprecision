'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Ugyldig e-post eller passord');
      } else {
        router.push('/admin/dashboard');
      }
    } catch {
      setError('En feil oppstod. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Laser <span className="text-gold shimmer-effect inline-block">Presisjon</span>
          </h1>
          <div className="h-1 w-20 bg-gold-gradient rounded-full mx-auto mb-4" />
          <p className="text-gray-300">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">Logg Inn</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                E-post
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@laserpresisjon.no"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
                Passord
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logger inn...' : 'Logg Inn'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Standard pålogging: admin@laserpresisjon.no / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
