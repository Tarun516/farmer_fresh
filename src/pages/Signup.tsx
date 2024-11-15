import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ShoppingBag, KeyRound } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer'>('buyer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const signupData = { email, password, role };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/login/${role}`);
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
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community of farmers and buyers
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <div className="text-xs text-gray-400">Required</div>
                </div>
              </div>

              <div className="relative group">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  required
                  minLength={6}
                />
              </div>

              <div className="relative group">
                <KeyRound className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-gray-500 space-y-1 px-2">
              <p>Password requirements:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Minimum 6 characters long</li>
                <li>Must contain at least one number</li>
                <li>Must contain at least one special character</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to={`/login/${role}`}
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
            >
              Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;