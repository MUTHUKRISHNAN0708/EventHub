import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, XCircle, ShoppingBag, LayoutDashboard, Users, CreditCard, Store, FileText } from 'lucide-react';
import api from '../utils/api';
import AdminBookingsTab from '../components/AdminBookingsTab';
import AdminVendorsTab from '../components/AdminVendorsTab';
import AdminUsersTab from '../components/AdminUsersTab';
import AdminFinancialsTab from '../components/AdminFinancialsTab';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/bookings')
        ]);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  // Remove handleUpdateStatus from here as it's now in AdminBookingsTab

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-midnight">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-midnight min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-primary-200 mb-2 uppercase tracking-tighter animate-float">Royal Command Center</h1>
            <p className="text-primary-500 font-bold text-[10px] md:text-xs uppercase tracking-widest opacity-60">Imperial Oversight & System Orchestration</p>
          </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-md p-1.5 md:p-2 rounded-2xl w-full md:w-fit border border-primary-500/10 shadow-lg overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 whitespace-nowrap ${activeTab === 'overview' ? 'bg-royal-gradient text-primary-200 shadow-glow-sm' : 'text-primary-400/60 hover:text-primary-300 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={14} className="mr-1.5 md:mr-2" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 whitespace-nowrap ${activeTab === 'bookings' ? 'bg-royal-gradient text-primary-200 shadow-glow-sm' : 'text-primary-400/60 hover:text-primary-300 hover:bg-white/5'}`}
          >
            <ShoppingBag size={14} className="mr-1.5 md:mr-2" /> Ledger
          </button>
          <button 
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 whitespace-nowrap ${activeTab === 'vendors' ? 'bg-royal-gradient text-primary-200 shadow-glow-sm' : 'text-primary-400/60 hover:text-primary-300 hover:bg-white/5'}`}
          >
            <Store size={14} className="mr-1.5 md:mr-2" /> Registry
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 whitespace-nowrap ${activeTab === 'users' ? 'bg-royal-gradient text-primary-200 shadow-glow-sm' : 'text-primary-400/60 hover:text-primary-300 hover:bg-white/5'}`}
          >
            <Users size={14} className="mr-1.5 md:mr-2" /> Citizens
          </button>
          <button 
            onClick={() => setActiveTab('financials')}
            className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 whitespace-nowrap ${activeTab === 'financials' ? 'bg-royal-gradient text-primary-200 shadow-glow-sm' : 'text-primary-400/60 hover:text-primary-300 hover:bg-white/5'}`}
          >
            <CreditCard size={14} className="mr-1.5 md:mr-2" /> Treasury
          </button>
        </div>

        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 md:p-3 bg-primary-500/10 rounded-xl md:rounded-2xl text-primary-400 shadow-inner border border-primary-500/20">
                  <CreditCard size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-400/50">Total Revenue</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary-200 tracking-tighter">${stats.totalRevenue.toLocaleString()}</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 md:p-3 bg-blue-500/10 rounded-xl md:rounded-2xl text-blue-400 shadow-inner border border-blue-500/20">
                  <ShoppingBag size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-400/50">Total Bookings</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary-200 tracking-tighter">{stats.totalBookings}</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 md:p-3 bg-red-500/10 rounded-xl md:rounded-2xl text-red-400 shadow-inner border border-red-500/20 pulse">
                  <Users size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-400/50">Pending Approval</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary-200 tracking-tighter text-red-400">{stats.pendingBookings}</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 md:p-3 bg-green-500/10 rounded-xl md:rounded-2xl text-green-400 shadow-inner border border-green-500/20">
                  <Store size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-400/50">Active Vendors</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-primary-200 tracking-tighter">{stats.totalVendors}</h3>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <AdminBookingsTab bookings={bookings} setBookings={setBookings} />
        )}
        
        {activeTab === 'vendors' && (
          <AdminVendorsTab />
        )}
        
        {activeTab === 'users' && (
          <AdminUsersTab />
        )}

        {activeTab === 'financials' && (
          <AdminFinancialsTab />
        )}
      </div>
    </div>
  );
};

export default Admin;
