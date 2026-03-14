import React, { useState, useEffect } from 'react';
import { Star, MapPin, Users, CheckCircle, ShoppingBag, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await api.get('/vendors');
        // Just take the first 2 for featured
        setFeaturedVendors(data.slice(0, 2));
      } catch (error) {
        console.error(error);
      }
    };
    fetchVendors();
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      navigate(`/vendors?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate('/vendors');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative premium-gradient text-white py-12 md:py-24 overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-primary-200 animate-float uppercase leading-tight">
            Book Venue, <span className="text-white">Professional</span> Photography & Decor
          </h1>
          <p className="mt-2 text-lg md:text-2xl opacity-90 mb-6 md:mb-8 max-w-3xl mx-auto text-primary-50">
            The easiest way to plan your Wedding, Birthday, or Corporate Event.
          </p>
          
          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto bg-midnight/50 backdrop-blur-xl rounded-full p-1.5 md:p-2 flex items-center shadow-2xl border border-primary-500/20 hover-glow transition-all"
          >
            <div className="flex-grow flex items-center px-2 md:px-4">
              <Search size={18} className="text-primary-500/50 mr-2 md:mr-2" />
              <input 
                type="text" 
                placeholder="Search premium venues..." 
                className="w-full py-2 md:py-3 rounded-l-full text-primary-100 bg-transparent placeholder-primary-700/50 focus:outline-none font-medium text-sm md:text-base"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="btn-gold px-6 md:px-10 py-2 md:py-3 rounded-full font-black uppercase tracking-widest transition-all text-[10px] md:text-xs"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-ivory/50 dark:bg-midnight/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-midnight-blue dark:text-primary-200 text-center mb-12 uppercase tracking-tight">Browse by Event Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Wedding', 'Birthday', 'Engagement', 'Anniversary', 'Corporate'].map((cat, idx) => (
              <Link to={`/categories?type=${cat}`} key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl shadow-sm p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer border border-primary-500/10 hover:border-primary-500/40 group hover-glow">
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 font-extrabold text-2xl group-hover:bg-midnight-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                  {cat.charAt(0)}
                </div>
                <h3 className="font-bold text-midnight-blue dark:text-primary-100 group-hover:text-midnight-blue dark:group-hover:text-primary-500 transition-colors">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Vendors */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-midnight-blue dark:text-primary-200 uppercase tracking-tight">Featured Vendors</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium italic">Top-rated venues and services for your next premium event.</p>
            </div>
            <Link to="/vendors" className="text-midnight-blue dark:text-primary-500 font-bold hover:underline hidden sm:block">View all &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <Link to={`/vendors/${vendor._id}`} key={vendor._id} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-primary-500/10 hover:scale-[1.02] group">
                <div className="h-48 overflow-hidden relative">
                  <img src={vendor.bannerImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80'} alt={vendor.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-midnight-blue text-primary-200 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-primary-500/30">
                    {vendor.vendorType}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary-500 transition-colors uppercase tracking-tight">{vendor.name}</h3>
                    <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-green-700 dark:text-green-400 text-sm font-medium">
                      <Star size={14} className="fill-current mr-1" />
                      {vendor.rating}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <MapPin size={16} className="mr-1" /> {vendor.location}
                  </div>
                  {vendor.capacity > 0 && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <Users size={16} className="mr-1" /> Up to {vendor.capacity} guests
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">{vendor.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/vendors" className="text-midnight-blue dark:text-primary-500 font-bold hover:underline">View all vendors &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Package Tiers Highlight */}
      <div className="py-20 bg-midnight text-white relative overflow-hidden border-y border-primary-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-midnight-blue/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-primary-200 leading-tight">Choose Your Elite Package</h2>
            <p className="text-primary-100/70 max-w-2xl mx-auto text-base md:text-lg italic">We offer tiered pricing to suit every budget, from luxury platinum bundles to essential basic services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 hover:border-primary-500/50 transition-all hover:shadow-2xl hover:shadow-primary-500/10 group cursor-default">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-premium-gradient rounded-2xl flex items-center justify-center text-primary-200 mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-midnight-blue/30 border border-primary-500/20">
                <Star size={24} className="md:w-[28px] md:h-[28px] fill-current" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-primary-100">Premium Platinum</h3>
              <p className="text-gray-400 mb-6 text-xs md:text-sm leading-relaxed">All-inclusive bundles with luxury decor, full-day access, and premium multi-cuisine catering for grand celebrations.</p>
              <div className="inline-flex items-center text-primary-300 font-bold bg-primary-400/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-primary-400/20">
                Best for Weddings & Galas
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-indigo-500/50 hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/20 group md:scale-105 shadow-2xl shadow-indigo-500/20 z-10 cursor-default">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-500/30">
                <CheckCircle size={24} className="md:w-[28px] md:h-[28px]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Standard Elegance</h3>
              <p className="text-gray-400 mb-6 text-xs md:text-sm leading-relaxed">Perfect balance of quality and value. Professional venues with essential photography and delicious catering options.</p>
              <div className="inline-flex items-center text-indigo-400 font-bold bg-indigo-400/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-indigo-400/20">
                Most Popular Choice
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 group cursor-default">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform shadow-lg shadow-blue-500/30">
                <ShoppingBag size={24} className="md:w-[28px] md:h-[28px]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">Basic & Budget</h3>
              <p className="text-gray-400 mb-6 text-xs md:text-sm leading-relaxed">Essential space rental or specific solo services like photography-only or catering-only options for smaller budgets.</p>
              <div className="inline-flex items-center text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-blue-400/20">
                Great for Small Parties
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-ivory dark:bg-midnight/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-midnight-blue dark:text-primary-200 mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800/80 p-8 rounded-2xl shadow-sm relative border border-primary-100 dark:border-primary-900/30">
                <div className="flex justify-center mb-4 text-primary-500">
                  <Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" /><Star className="fill-current" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed font-medium">"EventHub made booking our wedding venue so incredibly easy. We saved hours of research and got a great deal!"</p>
                <div className="font-black text-midnight-blue dark:text-primary-500 uppercase tracking-widest text-sm">- Sarah & Mike</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
