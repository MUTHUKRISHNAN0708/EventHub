import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, LogOut, Calendar } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 w-full border-b border-primary-500/10 dark:border-primary-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-gradient group">
            <Calendar className="text-primary-500 transition-transform group-hover:rotate-12" size={28} />
            <span className="tracking-tighter">EventHub</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/categories" className="text-primary-200 hover:text-primary-500 font-semibold transition-colors">Categories</Link>
            <Link to="/vendors" className="text-primary-200 hover:text-primary-500 font-semibold transition-colors">Vendors</Link>
            
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-primary-400 text-[10px] font-black tracking-widest uppercase hidden lg:block">Welcome, <span className="text-primary-200">{user.name}</span></span>
                <Link to="/dashboard" className="text-primary-200 hover:text-primary-500 font-semibold transition-colors">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-primary-200 hover:text-primary-500 font-semibold transition-colors uppercase tracking-widest text-xs border border-primary-500/30 px-3 py-1 rounded-full">Admin</Link>
                )}
                <button 
                  onClick={logout} 
                  className="btn-premium px-6 py-2 rounded-full text-sm uppercase tracking-widest shadow-lg shadow-midnight-blue/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-primary-200 hover:text-primary-500 font-black uppercase tracking-widest text-xs transition-colors">Login</Link>
                <Link to="/register" className="btn-gold px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-500 hover:text-primary-200 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-effect border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/categories" className="block px-4 py-3 text-base font-black text-primary-200 hover:text-primary-500 hover:bg-white/5 rounded-xl transition-all uppercase tracking-tighter">Categories</Link>
            <Link to="/vendors" className="block px-4 py-3 text-base font-black text-primary-200 hover:text-primary-500 hover:bg-white/5 rounded-xl transition-all uppercase tracking-tighter">Vendors</Link>
            
            {user ? (
              <div className="pt-4 border-t border-primary-500/10">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="block px-4 py-3 text-base font-black text-primary-200 hover:text-primary-500 hover:bg-white/5 rounded-xl transition-all uppercase tracking-tighter">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 text-base font-black text-red-400 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-tighter"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-primary-500/10 space-y-2">
                <Link to="/login" className="block px-4 py-3 text-base font-black text-primary-200 hover:text-primary-500 hover:bg-white/5 rounded-xl transition-all uppercase tracking-tighter">Login</Link>
                <Link to="/register" className="block px-4 py-3 text-base font-black text-midnight btn-gold rounded-xl transition-all text-center uppercase tracking-widest">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
