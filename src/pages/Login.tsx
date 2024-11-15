import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ShoppingBag } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer'>('buyer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const loginData = { email, password };

    try {
      const response = await fetch(`/api/auth/login/${role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate(`/${role}-dashboard`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-green-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="flex justify-center space-x-6">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                role === 'farmer'
                  ? 'bg-green-50 text-green-700 ring-2 ring-green-600'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <User className={`w-6 h-6 ${role === 'farmer' ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="mt-2 text-sm font-medium">Farmer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                role === 'buyer'
                  ? 'bg-green-50 text-green-700 ring-2 ring-green-600'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <ShoppingBag className={`w-6 h-6 ${role === 'buyer' ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="mt-2 text-sm font-medium">Buyer</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to={`/signup/${role}`}
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
            >
              Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;