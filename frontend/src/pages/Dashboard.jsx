import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Calendar, MapPin, Clock, CheckCircle, Clock3, Users } from 'lucide-react';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-midnight">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this royal request?')) {
      try {
        await api.delete(`/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Cancellation failed');
      }
    }
  };

  return (
    <div className="bg-midnight min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-primary-200 mb-2 uppercase tracking-tighter animate-float">My Dashboard</h1>
          <p className="text-primary-400 text-sm md:text-base font-medium tracking-wide">Welcome back, {user?.name}. Manage your event bookings here.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-primary-500/20 overflow-hidden">
          <div className="bg-white/5 px-4 md:px-6 py-4 md:py-5 border-b border-primary-500/10 font-black text-base md:text-lg text-primary-200 uppercase tracking-widest flex justify-between items-center">
            <span>My Bookings ({bookings.length})</span>
          </div>
          
          {bookings.length === 0 ? (
            <div className="p-10 md:p-20 text-center text-primary-500 bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-primary-500/10 m-4 md:m-6 animate-in fade-in zoom-in duration-700">
              <Calendar className="mx-auto text-primary-500/50 mb-6 h-12 w-12 md:h-20 md:w-20 animate-float" />
              <p className="text-xl md:text-2xl font-black mb-6 text-primary-200 uppercase tracking-tight">your calendar is empty</p>
              <button onClick={() => navigate('/vendors')} className="btn-gold font-black text-midnight px-6 md:px-10 py-3 md:py-4 rounded-xl hover:scale-105 transition-all shadow-xl active:scale-95 group text-sm md:text-base">
                Find Venues <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-primary-500/5 animate-in fade-in duration-700">
              {bookings.map(booking => (
                  <div key={booking._id} className="p-6 md:p-10 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:bg-white/5 transition-all duration-500 group border-b border-primary-500/5 last:border-0 hover-glow">
                    <div className="space-y-4 md:w-2/3">
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
                        <span className={`px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest inline-flex items-center border ${booking.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : booking.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-primary-500/10 text-primary-400 border-primary-500/20 pulse'}`}>
                          {booking.status === 'Approved' ? <CheckCircle size={12} className="mr-1.5" /> : <Clock3 size={12} className="mr-1.5" />}
                          {booking.status}
                        </span>
                        <span className="font-black text-primary-500 bg-white/5 text-[9px] md:text-[10px] px-2.5 md:px-3 py-1.5 rounded-full border border-primary-500/20 uppercase tracking-widest transition-all group-hover:border-primary-500/50">
                          {booking.eventType}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl md:text-2xl font-black text-primary-100 uppercase tracking-tight group-hover:text-primary-500 transition-colors drop-shadow-sm leading-tight">{booking.venueId?.name || 'Venue Unavailable'}</h3>
                        <div className="flex items-center text-primary-400/80 text-xs md:text-sm mt-1 font-medium">
                          <MapPin size={14} className="mr-1.5 text-primary-500" /> {booking.venueId?.location || 'Unknown'}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-3 gap-x-6 md:gap-x-8 text-xs md:text-sm text-primary-400 font-bold tracking-wide">
                        <div className="flex items-center group/info transition-all hover:text-primary-200"><Calendar size={16} className="mr-2 text-primary-500 transition-transform group-hover/info:scale-110" /> {new Date(booking.eventDate).toLocaleDateString()}</div>
                        <div className="flex items-center group/info transition-all hover:text-primary-200"><Clock size={16} className="mr-2 text-primary-500 transition-transform group-hover/info:scale-110" /> {booking.eventTime}</div>
                        <div className="flex items-center group/info transition-all hover:text-primary-200"><Users size={16} className="mr-2 text-primary-500 transition-transform group-hover/info:scale-110" /> {booking.guestCount} Guests</div>
                      </div>
  
                      {booking.servicesSelected && booking.servicesSelected.length > 0 && (
                        <div className="text-xs pt-4 border-t border-primary-500/5 mt-4">
                          <span className="font-black text-primary-500 uppercase tracking-tighter mr-3 text-[10px]">Services: {booking.servicesSelected.length}</span> 
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {booking.servicesSelected.map((s) => (
                              <span key={s._id} className="bg-primary-500/5 text-primary-300 px-2.5 py-1 rounded-full border border-primary-500/10 text-[10px] font-medium">
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:text-right border-t md:border-t-0 pt-6 md:pt-0 border-primary-500/5 mt-2 md:mt-0 bg-white/2 p-5 md:p-0 rounded-2xl md:bg-transparent">
                      <div className="text-[9px] md:text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-1">Total Investment</div>
                      <div className="text-3xl md:text-4xl font-black text-primary-200 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] tracking-tighter">₹{booking.totalAmount}</div>
                    
                    {booking.status === 'Pending' && (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="text-red-400 font-black hover:text-red-100 text-xs transition-all border border-red-500/20 hover:bg-red-500/30 px-6 py-2.5 rounded-full uppercase tracking-widest hover:scale-105 active:scale-95 shadow-lg"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
