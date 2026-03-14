import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Calendar } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      // Navigation handled by useEffect
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-in fade-in duration-1000">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Calendar className="text-royal-blue dark:text-primary-500 w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-primary-200 mb-2 tracking-tight uppercase animate-float">Create Account</h2>
        <p className="text-primary-400 font-medium tracking-wide">Join EventHub and start planning your royal functions</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/5 backdrop-blur-xl py-10 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-[2.5rem] sm:px-10 border border-primary-500/20 hover:border-primary-500/40 transition-all hover-glow">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center border border-red-100 dark:border-red-800">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-black text-primary-200 uppercase tracking-widest">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-primary-500/20 bg-white/5 text-primary-100 rounded-xl shadow-sm placeholder-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-primary-200 uppercase tracking-widest">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-primary-500/20 bg-white/5 text-primary-100 rounded-xl shadow-sm placeholder-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-primary-200 uppercase tracking-widest">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-primary-500/20 bg-white/5 text-primary-100 rounded-xl shadow-sm placeholder-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-primary-200 uppercase tracking-widest">Confirm Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-primary-500/20 bg-white/5 text-primary-100 rounded-xl shadow-sm placeholder-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold btn-gold transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-primary-400 font-medium">Already have an account? </span>
            <Link to="/login" className="font-extrabold text-primary-500 hover:underline tracking-tight">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
