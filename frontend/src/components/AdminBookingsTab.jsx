import React, { useState } from 'react';
import { CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import api from '../utils/api';

const AdminBookingsTab = ({ bookings, setBookings }) => {
  const [filter, setFilter] = useState('All');

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
    } catch (error) {
      alert('Error updating status');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-primary-500/20 overflow-hidden">
      <div className="bg-white/5 px-4 md:px-6 py-4 md:py-5 border-b border-primary-500/10 font-black text-lg text-primary-200 uppercase tracking-widest flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>Bookings Ledger</span>
        
        <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-midnight/60 border border-primary-500/20 text-primary-300 rounded-xl px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-[10px] md:text-xs font-black shadow-inner uppercase tracking-widest cursor-pointer flex-1 sm:w-40"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <span className="text-[10px] md:text-xs bg-primary-500/20 px-3 py-2 rounded-full shadow-inner whitespace-nowrap">{filteredBookings.length} Total</span>
        </div>
      </div>
      
      <div className="overflow-x-auto min-h-[400px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white/5 border-b border-primary-500/10">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-4 text-left text-[10px] md:text-xs font-black text-primary-400 uppercase tracking-[0.2em]">Customer</th>
              <th scope="col" className="px-4 md:px-6 py-4 text-left text-[10px] md:text-xs font-black text-primary-400 uppercase tracking-[0.2em]">Details</th>
              <th scope="col" className="px-4 md:px-6 py-4 text-left text-[10px] md:text-xs font-black text-primary-400 uppercase tracking-[0.2em]">Venue</th>
              <th scope="col" className="px-4 md:px-6 py-4 text-left text-[10px] md:text-xs font-black text-primary-400 uppercase tracking-[0.2em]">Status</th>
              <th scope="col" className="px-4 md:px-6 py-4 text-right text-[10px] md:text-xs font-black text-primary-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-primary-500/5 transition-all">
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-white/10 transition-all duration-300 group border-b border-primary-500/5 last:border-0 hover-glow">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-black text-primary-200 uppercase tracking-tight">{booking.customerId?.name}</div>
                  <div className="text-xs font-medium text-primary-400/70">{booking.customerId?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary-100 font-black uppercase tracking-tighter">{booking.eventType}</div>
                  <div className="text-xs text-primary-400 font-medium">{new Date(booking.eventDate).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary-300 font-medium">{booking.venueId?.name || 'N/A'}</div>
                  <div className="text-lg font-black text-primary-500 tracking-tighter">₹{booking.totalAmount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-4 py-1.5 inline-flex text-[10px] items-center font-black rounded-full border border-primary-500/20 uppercase tracking-widest ${
                    booking.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    booking.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    'bg-primary-500/10 text-primary-400 border-primary-500/20 pulse'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {booking.status === 'Pending' && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleUpdateStatus(booking._id, 'Approved')} className="text-green-400 hover:text-green-100 border border-green-500/20 hover:bg-green-500/30 px-3 py-1 rounded-full transition-all flex items-center text-xs font-black uppercase tracking-widest">
                        <CheckCircle size={14} className="mr-1.5" /> Approve
                      </button>
                      <button onClick={() => handleUpdateStatus(booking._id, 'Rejected')} className="text-red-400 hover:text-red-100 border border-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-full transition-all flex items-center text-xs font-black uppercase tracking-widest">
                        <XCircle size={14} className="mr-1.5" /> Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center p-20 text-center text-primary-500/50 bg-white/2">
            <div className="mb-4 opacity-30">
              <ShoppingBag size={48} />
            </div>
            <p className="text-lg font-black uppercase tracking-tighter">No Royal Bookings Found For This Filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsTab;
