import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Calendar, Users, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import api from '../utils/api';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get('venueId');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [venue, setVenue] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  
  // Form State
  const [eventType, setEventType] = useState('Wedding Ceremony');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('10:00');
  const [guestCount, setGuestCount] = useState(100);
  const [selectedServices, setSelectedServices] = useState([]);
  
  // Status State
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!venueId) {
      navigate('/vendors');
      return;
    }

    const fetchVenue = async () => {
      try {
        const { data } = await api.get(`/vendors/${venueId}`);
        setVenue(data.vendor);
        setAvailableServices(data.services);
      } catch (error) {
        console.error("Venue not found", error);
        navigate('/vendors');
      }
    };
    fetchVenue();
  }, [venueId, user, navigate]);

  const checkDateAvailability = async () => {
    if (!eventDate) return;
    setLoading(true);
    setAvailabilityMessage('');
    try {
      const { data } = await api.post('/bookings/availability', { venueId, eventDate });
      setIsAvailable(data.available);
      setAvailabilityMessage(data.message);
    } catch (error) {
      setAvailabilityMessage('Error checking availability');
      setIsAvailable(false);
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    let total = 0; // Base venue price could be added if venue has a base price
    selectedServices.forEach(id => {
      const s = availableServices.find(srv => srv._id === id);
      if (s) total += s.price;
    });
    return total;
  };

  const handleServiceToggle = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(sId => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const submitBooking = async () => {
    setSubmitting(true);
    try {
      await api.post('/bookings', {
        venueId,
        eventType,
        eventDate,
        eventTime,
        guestCount,
        servicesSelected: selectedServices,
        totalAmount: calculateTotal(),
      });
      setStep(4); // Success step
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
    setSubmitting(false);
  };

  if (!venue) return (
    <div className="flex justify-center items-center h-screen bg-midnight">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
  );

  return (
    <div className="bg-midnight min-h-screen py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-black text-primary-200 mb-6 text-center animate-float uppercase tracking-tighter">Book {venue.name}</h1>
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-white/5 -z-10"></div>
            <div className={`absolute left-0 top-1/2 h-1 bg-primary-500 -z-10 transition-all shadow-[0_0_10px_rgba(212,175,55,0.5)]`} style={{ width: `${(step - 1) * 33.33}%` }}></div>
            
            {[1, 2, 3, 4].map(num => (
              <div key={num} className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${step >= num ? 'bg-primary-500 text-midnight shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-primary-600 border border-primary-500/20'} ${step === num ? 'ring-4 ring-primary-500/20 scale-110' : ''}`}>
                {num === 4 ? <CheckCircle size={16} className="md:w-5 md:h-5" /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary-500/50 mt-4 px-1 md:px-2">
            <span className="max-w-[50px] md:max-w-none text-center">Imperial Details</span>
            <span className="max-w-[50px] md:max-w-none text-center">Royal Services</span>
            <span className="max-w-[50px] md:max-w-none text-center">Final Manifesto</span>
            <span className="max-w-[50px] md:max-w-none text-center">Decree Done</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-8 border border-primary-500/20 hover-glow transition-all">
          
          {/* Step 1: Event Details & Availability */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-black text-primary-200 border-b border-primary-500/10 pb-4 uppercase tracking-tight">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-primary-400 mb-2 uppercase tracking-wider">Event Type</label>
                  <select 
                    value={eventType} onChange={(e) => setEventType(e.target.value)}
                    className="w-full border-primary-500/20 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 p-4 bg-white/5 text-primary-100 border transition-all"
                  >
                    <optgroup label="Wedding Celebrations">
                      <option>Wedding Ceremony</option>
                      <option>Wedding Reception</option>
                      <option>Engagement Ceremony</option>
                      <option>Mehendi Function</option>
                      <option>Haldi Ceremony</option>
                      <option>Sangeet Night</option>
                      <option>Bridal Shower</option>
                      <option>Bachelor / Bachelorette Party</option>
                    </optgroup>
                    <optgroup label="Personal Celebrations">
                      <option>Birthday Party</option>
                      <option>Kids Birthday Party</option>
                      <option>Anniversary Celebration</option>
                      <option>Baby Shower</option>
                      <option>Naming Ceremony</option>
                      <option>Graduation Party</option>
                      <option>Housewarming Party</option>
                      <option>Family Reunion</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-primary-200 mb-2 uppercase tracking-widest">Expected Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" size={18} />
                    <input 
                      type="number" min="1" max={venue.capacity || 10000}
                      value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      className="w-full pl-12 border-primary-500/20 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 p-4 bg-white/5 text-primary-100 border transition-all"
                    />
                  </div>
                  {venue.capacity > 0 && <p className="text-[10px] font-black text-primary-500/50 mt-2 uppercase tracking-widest italic text-right">Max Capacity: {venue.capacity} Souls</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-primary-200 mb-2 uppercase tracking-widest">Celestial Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" size={18} />
                    <input 
                      type="date" 
                      value={eventDate} onChange={(e) => { setEventDate(e.target.value); setIsAvailable(null); }}
                      className="w-full pl-12 border-primary-500/20 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 p-4 bg-white/5 text-primary-100 border transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-primary-200 mb-2 uppercase tracking-widest">Solar Time</label>
                  <input 
                    type="time" 
                    value={eventTime} onChange={(e) => setEventTime(e.target.value)}
                    className="w-full border-primary-500/20 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 p-4 bg-white/5 text-primary-100 border transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <button 
                  onClick={checkDateAvailability}
                  disabled={!eventDate || loading}
                  className="w-full btn-gold font-black py-4 rounded-xl transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
                >
                  {loading ? 'Consulting the Royal Stars...' : 'Check Availability'}
                </button>
                
                {isAvailable !== null && (
                  <div className={`mt-4 p-4 rounded-lg flex items-start ${isAvailable ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {isAvailable ? <CheckCircle className="mr-2 mt-0.5" size={20} /> : <AlertCircle className="mr-2 mt-0.5" size={20} />}
                    <div>
                      <h4 className="font-bold">{isAvailable ? 'Date is Available!' : 'Date Unavailable'}</h4>
                      <p className="text-sm">{availabilityMessage}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!isAvailable}
                  className="btn-gold px-12 py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-30 disabled:grayscale transition-all hover:scale-105"
                >
                  Proceed to Services &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Services */}
          {step === 2 && (
            <div className="space-y-6">
                <h2 className="text-2xl font-black text-primary-200 border-b border-primary-500/10 pb-4 uppercase tracking-tight">Select Packages & Services</h2>
                
                {availableServices.length === 0 ? (
                  <div className="text-center py-12 text-primary-500/50 bg-white/2 rounded-3xl border border-dashed border-primary-500/10">
                    <ShoppingBag className="mx-auto mb-4 opacity-50" size={48} />
                    <p className="text-sm font-black uppercase tracking-widest tracking-tighter">No Royal Services listed for this venue yet.</p>
                  </div>
              ) : (
                <div className="space-y-4">
                  {availableServices.map(service => (
                      <div 
                        key={service._id} 
                        onClick={() => handleServiceToggle(service._id)}
                        className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all hover:scale-[1.02] group ${selectedServices.includes(service._id) ? 'border-primary-500 bg-primary-500/10 shadow-glow-sm' : 'border-primary-500/10 bg-white/5 hover:border-primary-500/30'}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-5 transition-all ${selectedServices.includes(service._id) ? 'bg-primary-500 border-primary-500' : 'border-primary-500/30 group-hover:border-primary-500/60'}`}>
                              {selectedServices.includes(service._id) && <CheckCircle size={18} className="text-midnight font-black" />}
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-primary-100 uppercase tracking-tighter">{service.name}</h3>
                              <p className="text-xs text-primary-100/50 font-medium">{service.description}</p>
                            </div>
                          </div>
                          <div className="font-black text-xl text-primary-500 tracking-tighter shadow-glow-sm">
                            ₹{service.price}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              )}

                <div className="flex justify-between pt-8 border-t border-primary-500/10">
                  <span className="text-primary-400 font-black uppercase tracking-widest text-sm">Royal Total Estimation:</span>
                        <span className="text-2xl font-black text-primary-500 tracking-tighter">₹{calculateTotal()}</span>
                </div>
  
                <div className="flex justify-between pt-8">
                  <button onClick={() => setStep(1)} className="px-8 py-4 text-primary-400 hover:text-primary-200 font-black uppercase tracking-widest text-xs transition-all">Back</button>
                  <button onClick={() => setStep(3)} className="btn-gold px-12 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105">
                    Review Command &rarr;
                  </button>
                </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
                <h2 className="text-2xl font-black text-primary-200 border-b border-primary-500/10 pb-4 uppercase tracking-tight">Review Your Manifesto</h2>
                
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-primary-500/20 shadow-2xl">
                  <h3 className="font-black text-xs mb-6 text-primary-400 border-b border-primary-500/10 pb-3 uppercase tracking-[0.2em]">Imperial Event Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 text-sm font-medium">
                    <div className="text-primary-100/40 uppercase tracking-widest text-[10px]">Royal Venue</div>
                    <div className="font-black text-primary-100 text-right uppercase tracking-tighter">{venue.name}</div>
                    <div className="text-primary-100/40 uppercase tracking-widest text-[10px]">Event Type</div>
                    <div className="font-black text-primary-100 text-right uppercase tracking-tighter">{eventType}</div>
                    <div className="text-primary-100/40 uppercase tracking-widest text-[10px]">Celestial Date</div>
                    <div className="font-black text-primary-100 text-right uppercase tracking-tighter">{new Date(eventDate).toLocaleDateString()}</div>
                    <div className="text-primary-100/40 uppercase tracking-widest text-[10px]">Solar Time</div>
                    <div className="font-black text-primary-100 text-right uppercase tracking-tighter">{eventTime}</div>
                    <div className="text-primary-100/40 uppercase tracking-widest text-[10px]">Royal Guests</div>
                    <div className="font-black text-primary-100 text-right uppercase tracking-tighter">{guestCount} Souls</div>
                  </div>
                </div>

                {selectedServices.length > 0 && (
                  <div className="bg-primary-500/5 backdrop-blur-md p-8 rounded-[2rem] border border-primary-500/20 shadow-2xl">
                    <h3 className="font-black text-xs mb-6 text-primary-400 border-b border-primary-500/10 pb-3 uppercase tracking-[0.2em]">Selected Royal Packages</h3>
                    <div className="space-y-4">
                      {selectedServices.map(id => {
                        const s = availableServices.find(srv => srv._id === id);
                        return (
                          <div key={id} className="flex justify-between text-base">
                            <span className="font-black text-primary-100 uppercase tracking-tighter">{s?.name}</span>
                            <span className="font-black text-primary-500 tracking-tighter">₹{s?.price}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-8 pt-6 border-t border-primary-500/10 text-xl font-black text-primary-200 uppercase tracking-tighter">
                      <span>Grand Total</span>
                      <span className="text-2xl text-primary-500 shadow-glow-sm">₹{calculateTotal()}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-10 border-t border-primary-500/10 mt-10">
                  <button onClick={() => setStep(2)} className="px-8 py-4 text-primary-400 hover:text-primary-200 font-black uppercase tracking-widest text-xs transition-all disabled:opacity-30" disabled={submitting}>Back</button>
                  <button 
                    onClick={submitBooking} 
                    disabled={submitting}
                    className="btn-gold px-12 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl flex items-center shadow-amber-500/20"
                  >
                    {submitting ? 'Transmitting Decree...' : 'Finalize Royal Request'}
                  </button>
                </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-10 md:py-20 bg-white/5 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] border border-primary-500/20 shadow-2xl animate-glow px-4">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 border border-primary-500/40 shadow-glow">
                <CheckCircle className="text-primary-500 w-10 h-10 md:w-16 md:h-16" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-primary-100 mb-4 md:mb-6 uppercase tracking-tighter">Decree Sent Efficiently!</h2>
              <p className="text-primary-100/60 max-w-lg mx-auto mb-10 md:mb-12 text-base md:text-lg font-medium leading-relaxed italic">
                "Your royal aspiration for <span className="text-primary-500 font-black">{venue.name}</span> has been etched into the imperial records. The Grand Council will review your request immediately."
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button onClick={() => navigate('/dashboard')} className="btn-gold px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl">
                  Enter My Ledger
                </button>
                <button onClick={() => navigate('/')} className="bg-white/5 hover:bg-white/10 text-primary-200 px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all border border-white/10">
                  Return to Sanctum
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Booking;
