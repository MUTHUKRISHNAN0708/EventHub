import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, PieChart, Activity, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';

const AdminFinancialsTab = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancials();
  }, []);

  const fetchFinancials = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/financials');
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching financials:', error);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-primary-500/10 mb-8">
        <h2 className="text-2xl font-black text-primary-200 uppercase tracking-widest">Royal Treasury Analytics</h2>
        <p className="text-primary-400 font-medium text-xs uppercase tracking-widest opacity-60">Deep dive into platform earnings and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue by Vendor */}
        <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-[2.5rem] p-8 shadow-2xl">
          <h3 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em] mb-8 flex items-center">
            <TrendingUp size={16} className="mr-3 text-primary-500" /> Top Profitable Vendors
          </h3>
          <div className="space-y-6">
            {data.revenueByVendor.map((vendor, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-black text-primary-100 uppercase tracking-tight">{vendor.name}</span>
                  <span className="text-lg font-black text-primary-500 tracking-tighter">₹{vendor.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                   <div 
                    className="bg-royal-gradient h-full rounded-full shadow-glow-sm transition-all duration-1000" 
                    style={{ width: `${(vendor.totalRevenue / data.revenueByVendor[0].totalRevenue) * 100}%` }}
                   ></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-primary-500/40">
                  <span>{vendor.bookingCount} Successful Decrees</span>
                  <span>{Math.round((vendor.totalRevenue / data.revenueByVendor[0].totalRevenue) * 100)}% of Top</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Event Type */}
        <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-[2.5rem] p-8 shadow-2xl">
          <h3 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em] mb-8 flex items-center">
            <PieChart size={16} className="mr-3 text-primary-500" /> Event Category Distribution
          </h3>
          <div className="space-y-6">
            {data.revenueByEventType.map((event, index) => (
              <div key={index} className="bg-white/2 border border-primary-500/5 p-4 rounded-2xl hover:border-primary-500/20 transition-all flex justify-between items-center">
                <div className="flex items-center">
                   <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mr-4 border border-primary-500/10">
                    <Activity size={14} />
                   </div>
                   <div>
                    <h4 className="text-xs font-black text-primary-100 uppercase tracking-widest">{event._id}</h4>
                    <p className="text-[10px] text-primary-500/60 font-medium">{event.bookingCount} Bookings</p>
                   </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-primary-200 tracking-tighter">₹{event.totalRevenue.toLocaleString()}</div>
                  <div className="text-[9px] text-green-400 font-black uppercase flex items-center justify-end">
                    <ArrowUpRight size={10} className="mr-0.5" /> Profitable
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends Table-like view */}
      <div className="bg-white/5 backdrop-blur-xl border border-primary-500/20 rounded-[2.5rem] p-8 shadow-2xl">
        <h3 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em] mb-8 flex items-center">
          <Calendar size={16} className="mr-3 text-primary-500" /> Recent Monetary Cycles
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {data.monthlyRevenue.map((month, index) => (
            <div key={index} className="bg-white/2 border border-primary-500/10 p-5 rounded-3xl text-center hover:bg-white/5 transition-all shadow-glow-sm">
               <div className="text-[10px] font-black text-primary-500/60 uppercase tracking-[0.2em] mb-3">{month._id}</div>
               <div className="text-xl font-black text-primary-100 tracking-tighter">${month.totalRevenue.toLocaleString()}</div>
               <div className="mt-2 w-full bg-primary-500/10 h-1 rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full w-[60%]"></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFinancialsTab;
