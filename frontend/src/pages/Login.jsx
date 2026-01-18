
import React from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'user';
      if (['ngo', 'verifier', 'corporate', 'admin'].includes(role)) {
        navigate(`/${role}`);
      }
      // If role is 'user' or unknown, do NOT redirect to avoid loops.
      // The UI below will handle showing a logout button.
    }
  }, [user, navigate]);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(true);
  const [selectedRole, setSelectedRole] = React.useState('ngo');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const roles = [
    { id: 'ngo', label: 'NGO / Project Developer', desc: 'Submit and manage projects', color: 'bg-emerald-600' },
    { id: 'verifier', label: 'Verifier / Auditor', desc: 'Validate project submissions', color: 'bg-blue-600' },
    { id: 'corporate', label: 'Corporate Buyer', desc: 'Purchase carbon credits', color: 'bg-indigo-600' },
    { id: 'admin', label: 'Registry Admin', desc: 'System oversight', color: 'bg-slate-700' },
  ];

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        // signIn updates the context, useEffect handles navigation
        const { error } = await signIn({ email, password });
        if (error) throw error;
      } else {
        const { error } = await signUp({
          email,
          password,
          role: selectedRole,
        });
        if (error) throw error;
        alert('Signup successful! Please check your email for verification.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Brand */}
        <div className="md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              CarbonChain
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              The official Blue Carbon Registry & MRV Platform. verifying transparency from eco-system to credit.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Safe</span>
              <span>•</span>
              <span>Transparent</span>
              <span>•</span>
              <span>Auditable</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form or Logged In State */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          {user ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">You are logged in</h2>
              <p className="text-slate-600 mb-6">
                Signed in as <strong>{user.email}</strong>.
                <br />
                Role: <strong>{user.user_metadata?.role || 'user'}</strong>
              </p>
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-6 text-sm">
                It seems your account role doesn't have a specific dashboard assigned.
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-500 mb-8">
                {isLogin ? 'Enter your credentials to access the portal.' : 'Select your role and create an account.'}
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`cursor-pointer border rounded-lg p-2 text-center text-xs transition-all ${selectedRole === role.id
                          ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                      >
                        {role.label}
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-teal-600 font-medium hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </>
          )}
          <p className="mt-8 text-center text-xs text-slate-400">
            © 2024 CarbonChain Registry. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
