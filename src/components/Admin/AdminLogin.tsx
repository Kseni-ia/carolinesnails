import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const success = await login(password);
    if (!success) {
      setError('Incorrect password');
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full relative z-10 mx-4">
        <div className="text-center mb-8">
          <img
            src="/final.svg"
            alt="Nail Artistry Logo"
            className="h-32 w-auto mx-auto drop-shadow-gold"
          />
          <h1 className="text-3xl font-bold text-white font-serif">Admin Přihlášení</h1>
          <p className="text-gray-400 mt-2 font-light">Vítejte zpět, prosím přihlašte se</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs font-medium mb-2 text-gray-300 uppercase tracking-wider">
              Heslo
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 text-white placeholder-gray-600 transition-all duration-300"
              placeholder="Zadejte administrátorské heslo"
              required
              disabled={isSubmitting}
            />
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-2 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg shadow-lg hover:shadow-primary-400/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
