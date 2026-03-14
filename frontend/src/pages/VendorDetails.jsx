import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Phone, Mail, CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import api from '../utils/api';

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const { data } = await api.get(`/vendors/${id}`);
        setVendor(data.vendor);
        setServices(data.services);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchVendorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-midnight">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 shadow-glow"></div>
      </div>
    );
  }

  if (!vendor) return <div className="text-center py-20 text-2xl font-black text-primary-500 uppercase tracking-widest">Royal Venue Not Found</div>;

  return (
    <div className="bg-midnight min-h-screen pb-16">
      {/* Banner */}
      <div className="h-80 md:h-96 relative w-full">
        <img 
          src={vendor.bannerImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80'} 
          alt={vendor.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white">
              <div className="inline-block royal-gradient text-primary-100 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-4 uppercase border border-primary-500/30 shadow-lg">
                {vendor.vendorType}
              </div>
              <h1 className="text-3xl md:text-6xl font-black mb-2 animate-float uppercase tracking-tighter text-primary-200 leading-none">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90 font-medium">
                <span className="flex items-center"><MapPin size={18} className="mr-1 text-primary-200" /> {vendor.location}</span>
                <span className="flex items-center bg-primary-500/20 px-3 py-1 rounded-full text-primary-200 border border-primary-500/30 shadow-inner"><Star size={18} className="fill-current mr-1" /> {vendor.rating}</span>
                {vendor.capacity > 0 && <span className="flex items-center"><Users size={18} className="mr-1 text-primary-200" /> Capacity: {vendor.capacity} guests</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-6 md:space-y-8">
            <div className="bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-primary-500/10 hover:border-primary-500/30 transition-all">
              <h2 className="text-xl md:text-2xl font-black text-primary-200 mb-4 uppercase tracking-tight">About This Royal Space</h2>
              <p className="text-primary-100/80 leading-relaxed text-base md:text-lg font-medium">{vendor.description}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-primary-500/10 hover:border-primary-500/30 transition-all">
              <h2 className="text-xl md:text-2xl font-black text-primary-200 mb-6 md:mb-8 uppercase tracking-tight">Offered Services & Royal Packages</h2>
              {services.length === 0 ? (
                <p className="text-gray-500 italic">No specific service packages listed yet.</p>
              ) : (
                <div className="space-y-8">
                  {/* Group Services by Package Level */}
                  {['Premium', 'Standard', 'Basic'].map((level) => {
                    const levelServices = services.filter(s => s.packageLevel === level);
                    if (levelServices.length === 0) return null;

                    return (
                      <div key={level} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg border transition-all ${
                            level === 'Premium' ? 'royal-gradient text-primary-100 border-primary-500/50' :
                            level === 'Standard' ? 'bg-primary-500/20 text-primary-200 border-primary-500/20' :
                            'bg-white/5 text-primary-400 border-white/10'
                          }`}>
                            {level} Package
                          </h3>
                          <div className="h-px bg-primary-500/10 flex-grow"></div>
                        </div>

                         <div className="grid grid-cols-1 gap-8">
                        {levelServices.map((service) => (
                          <div key={service._id} className={`bg-white/5 backdrop-blur-xl border-2 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:shadow-[0_20px_60px_rgba(212,175,55,0.1)] transition-all relative overflow-hidden group hover-glow ${
                            level === 'Premium' ? 'border-primary-500/40 shadow-2xl ring-2 ring-primary-500/10' : 'border-primary-500/10 hover:border-primary-500/30'
                          }`}>
                            {level === 'Premium' && (
                              <div className="absolute top-0 right-0 royal-gradient text-primary-200 px-4 py-2 rounded-bl-2xl text-[10px] font-black tracking-widest flex items-center gap-2 shadow-xl border-l border-b border-primary-500/30">
                                <Star size={12} className="fill-current text-primary-400" /> ROYAL SELECTION
                              </div>
                            )}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                               <div className="max-w-[70%] md:max-w-none">
                                <h3 className="text-xl md:text-3xl font-black text-primary-100 tracking-tighter uppercase group-hover:text-primary-500 transition-colors">{service.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {service.eventTypes && service.eventTypes.map(type => (
                                    <span key={type} className="text-[10px] bg-royal-blue/5 dark:bg-primary-900/20 text-royal-blue dark:text-primary-400 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-royal-blue/10 dark:border-primary-800/30">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-3xl md:text-4xl font-black text-primary-500 tracking-tighter shadow-glow-sm">
                                ₹{service.price}
                              </div>
                            </div>
                            
                            <p className="text-primary-100/60 mb-6 text-base leading-relaxed font-medium">{service.description}</p>
                            
                            {service.features && service.features.length > 0 && (
                              <div className="bg-white/2 backdrop-blur-sm p-6 rounded-2xl border border-primary-500/5">
                                <h4 className="font-black text-primary-400 mb-4 text-[10px] uppercase tracking-[0.2em]">What's Included:</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-primary-200/80 font-medium">
                                      <CheckCircle size={14} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Other Services (Custom or Uncategorized) */}
                      <div className="space-y-6 pt-8 border-t border-primary-500/10 dark:border-primary-900/20">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 shadow-lg">
                            Custom Options
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.filter(s => !['Premium', 'Standard', 'Basic'].includes(s.packageLevel)).map((service) => (
                          <div key={service._id} className="bg-white/5 backdrop-blur-xl border border-primary-500/10 rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:border-primary-500/40 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg md:text-xl font-black text-primary-200 uppercase tracking-tighter group-hover:text-primary-500 transition-colors">{service.name}</h3>
                              <div className="text-2xl md:text-3xl font-black text-primary-500 tracking-tighter">₹{service.price}</div>
                            </div>
                            <p className="text-primary-100/60 text-xs md:text-sm font-medium leading-relaxed">{service.description}</p>
                          </div>
                        ))}
                        </div>
                      </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-primary-500/30 sticky top-24 hover-glow">
              <h3 className="text-2xl font-black text-royal-blue dark:text-primary-200 mb-8 uppercase tracking-tight border-b border-primary-500/10 pb-4">Contact & Royal Booking</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-primary-200">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mr-4 border border-primary-500/20 shadow-glow-sm">
                    <Phone size={18} />
                  </div>
                  <span className="font-black tracking-tighter text-lg">{vendor.phone}</span>
                </div>
                <div className="flex items-center text-primary-200">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mr-4 border border-primary-500/20 shadow-glow-sm">
                    <Mail size={18} />
                  </div>
                  <span className="font-black tracking-tighter text-lg">{vendor.email}</span>
                </div>
              </div>

              <Link 
                to={`/book?venueId=${vendor._id}`} 
                className="w-full flex items-center justify-center btn-gold py-4 rounded-xl text-lg transition-all shadow-lg shadow-amber-500/20"
              >
                <CalendarIcon className="mr-2" size={20} />
                Check Availability & Book
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
