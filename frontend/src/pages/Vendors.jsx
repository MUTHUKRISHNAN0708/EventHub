import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Search, Filter } from 'lucide-react';
import api from '../utils/api';

const Vendors = () => {
  const [searchParams] = useSearchParams();
  const initType = searchParams.get('type') || '';
  const initEventType = searchParams.get('eventType') || '';
  const initKeyword = searchParams.get('keyword') || '';
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(initKeyword);
  const [type, setType] = useState(initType);
  const [eventType, setEventType] = useState(initEventType);
  const [debouncedKeyword, setDebouncedKeyword] = useState(initKeyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/vendors?keyword=${encodeURIComponent(debouncedKeyword)}&type=${encodeURIComponent(type)}&eventType=${encodeURIComponent(eventType)}`);
        setVendors(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchVendors();
  }, [debouncedKeyword, type, eventType]);

  return (
    <div className="bg-midnight min-h-screen py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-4 md:p-6 mb-8 md:mb-12 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between border border-primary-500/20 hover:border-primary-500/40 transition-all">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500/50" size={18} />
            <input 
              type="text" 
              placeholder="Seek royal venues..." 
              className="w-full pl-11 pr-4 py-3 md:py-4 rounded-2xl border border-primary-500/20 bg-midnight/40 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-primary-700/50 font-black uppercase tracking-tighter text-xs md:text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 text-primary-400/60 font-black uppercase tracking-widest text-[10px]">
              <Filter size={16} /> <span className="hidden sm:inline">Refine By:</span>
            </div>
            <select 
              className="bg-midnight/60 border border-primary-500/20 text-primary-300 rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64 font-black shadow-inner tracking-tight uppercase text-[10px] md:text-xs appearance-none cursor-pointer transition-all hover:bg-midnight/80"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" className="bg-midnight">All Vendors</option>
              <option value="Venue" className="bg-midnight">Venues</option>
              <option value="Catering" className="bg-midnight">Food & Catering</option>
              <option value="Photography" className="bg-midnight">Photography & Media</option>
              <option value="Music & Entertainment" className="bg-midnight">Music & Entertainment</option>
              <option value="Decor & Styling" className="bg-midnight">Decor & Styling</option>
              <option value="Lighting & Technical" className="bg-midnight">Lighting & Technical</option>
              <option value="Beauty & Personal Services" className="bg-midnight">Beauty & Personal Services</option>
              <option value="Event Planning" className="bg-midnight">Event Planning</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue dark:border-primary-500"></div>
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-24 bg-white/2 backdrop-blur-md rounded-[3rem] shadow-2xl border border-primary-500/10">
            <div className="text-primary-500/30 mb-8 text-7xl animate-pulse">🏰</div>
            <h3 className="text-2xl font-black text-primary-200 mb-4 uppercase tracking-tighter">No Professionals Found in this Realm</h3>
            {eventType && <p className="text-primary-500 font-bold mb-2 uppercase tracking-widest text-xs">For: {eventType}</p>}
            <p className="text-primary-700 font-medium italic">Adjust your search parameters to find the perfect royal match.</p>
            <button 
              onClick={() => { setKeyword(''); setType(''); setEventType(''); }} 
              className="mt-6 text-royal-blue dark:text-primary-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <Link to={`/vendors/${vendor._id}`} key={vendor._id} className="bg-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] transition-all duration-500 border border-primary-500/10 hover:border-primary-500/40 group flex flex-col h-full hover:scale-[1.03] active:scale-[0.98]">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={vendor.bannerImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80'} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 royal-gradient text-primary-100 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg border border-primary-500/30">
                    {vendor.vendorType}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-primary-100 leading-none group-hover:text-primary-500 transition-colors uppercase tracking-tighter">{vendor.name}</h3>
                    <div className="flex items-center bg-primary-500/20 px-3 py-1.5 rounded-full text-primary-400 text-xs font-black shadow-glow-sm border border-primary-500/30 whitespace-nowrap ml-2">
                      <Star size={14} className="fill-current mr-1.5" />
                      {vendor.rating} <span className="text-[9px] ml-1 opacity-70 uppercase tracking-widest hidden sm:inline">Reviews</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-primary-200/60 text-sm font-medium">
                      <MapPin size={16} className="mr-3 text-primary-500/50" /> {vendor.location}
                    </div>
                    {vendor.capacity > 0 && (
                      <div className="flex items-center text-primary-200/60 text-sm font-medium">
                        <Users size={16} className="mr-3 text-primary-500/50" /> Accommodates {vendor.capacity} Royals
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-6 pt-6 border-t border-primary-500/10">
                    <div>
                      <span className="text-primary-500/40 text-[9px] block uppercase font-black tracking-[0.2em] mb-1">Starting Investment</span>
                      <span className="text-3xl font-black text-primary-500 tracking-tighter">₹{vendor.startingPrice || 0}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-primary-400/50 text-[10px] block font-black uppercase tracking-widest mb-2">{vendor.packageCount} Tiers</span>
                      <div className="flex gap-1.5 justify-end">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-glow-sm"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-primary-100/40 text-xs line-clamp-2 mt-auto pb-4 mb-4 font-medium leading-relaxed italic uppercase tracking-wider">"{vendor.description}"</p>
                  
                  <div className="text-royal-blue dark:text-primary-500 font-black text-xs uppercase tracking-widest text-center group-hover:bg-royal-blue/5 dark:group-hover:bg-primary-900/20 transition-all py-3 rounded-xl border-2 border-transparent group-hover:border-royal-blue/20 dark:group-hover:border-primary-800/20">
                    View Details &amp; Book Now
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
