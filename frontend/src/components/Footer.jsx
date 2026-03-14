import React from 'react';
import { Calendar, Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight/80 backdrop-blur-xl border-t border-primary-500/20 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-gradient mb-6 hover:scale-105 transition-transform animate-float">
              <Calendar className="text-primary-500" />
              EventHub
            </Link>
            <p className="text-primary-400/80 text-sm mb-6 leading-relaxed font-medium">
              Making your special moments unforgettable. Book premium venues and top-rated royal event services in just a few clicks.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-primary-500 hover:text-white transition-all transform hover:scale-125 hover-glow p-2 rounded-full bg-white/5"><Instagram size={20} /></a>
              <a href="#" className="text-primary-500 hover:text-white transition-all transform hover:scale-125 hover-glow p-2 rounded-full bg-white/5"><Twitter size={20} /></a>
              <a href="#" className="text-primary-500 hover:text-white transition-all transform hover:scale-125 hover-glow p-2 rounded-full bg-white/5"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-black text-primary-200 mb-6 uppercase tracking-[0.2em]">For Customers</h3>
            <ul className="space-y-4 text-sm text-primary-400/90 font-medium">
              <li><Link to="/categories" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Browse Categories</Link></li>
              <li><Link to="/vendors" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Discover Vendors</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> My Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Account Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-black text-primary-200 mb-6 uppercase tracking-[0.2em]">For Vendors</h3>
            <ul className="space-y-4 text-sm text-primary-400/90 font-medium">
              <li><Link to="/admin" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Command Center</Link></li>
              <li><Link to="/register" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Partner Registration</Link></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Commercial Plans</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Success Ledger</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black text-primary-200 mb-6 uppercase tracking-[0.2em]">Support</h3>
            <ul className="space-y-4 text-sm text-primary-400/90 font-medium">
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Sanctum Help</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Contact the Council</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Privacy Decree</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="text-primary-500/30 group-hover:text-primary-500 transition-colors">&rsaquo;</span> Imperial Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-500/10 pt-10 mt-10 flex flex-col md:flex-row justify-between items-center bg-transparent">
          <p className="text-primary-600 text-[10px] font-black tracking-widest uppercase">
            &copy; {new Date().getFullYear()} EventHub Eternal Edition. 
          </p>
          <p className="text-primary-600 text-[10px] font-black tracking-widest uppercase flex items-center mt-4 md:mt-0">
            Engineered with <Heart size={14} className="text-primary-500 mx-2 animate-pulse" /> for royal experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
