import React, { useState } from 'react';
import FinovoLogo from '../assets/finovo_logo_black.png';
import { User, Lock, Mail } from 'lucide-react';

export default function LoginPage({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      onLogin({ email });
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Promo Panel */}
      <div className="hidden lg:flex lg:w-2/3 bg-indigo-600 text-white flex-col justify-center items-center p-16">
        <img src={FinovoLogo} alt="Finovo Logo" className="h-28 w-auto object-contain drop-shadow-lg"/>
        <h1 className="text-5xl font-extrabold mb-4">Welcome Back!</h1>
        <p className="text-lg max-w-md text-center">
          Log in to your Finovo account and continue leveraging AI-driven income forecasts, automated savings jars, and proactive alerts tailored to your financial journey.
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full lg:w-1/3 justify-center items-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:hidden">
            Finovo Login
          </h2>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-6 text-center text-sm text-gray-600">
            First time on Finovo?{' '}
            <button onClick={switchToRegister} className="text-indigo-600 hover:underline">
              Get started now
            </button>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500 space-x-4">
            <a href="/help" className="hover:underline">
              Help Center
            </a>
            <span>|</span>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
