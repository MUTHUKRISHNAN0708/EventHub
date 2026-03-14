import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, ShieldAlert, Mail, Calendar, Search } from 'lucide-react';
import api from '../utils/api';

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to banish this citizen from the empire? This action is permanent.')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const action = newRole === 'admin' ? 'promote to Royal Advisor' : 'demote to Citizen';
    
    if (window.confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      try {
        await api.put(`/admin/users/${user._id}/role`, { role: newRole });
        fetchUsers();
      } catch (error) {
        alert('Error updating role');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-primary-500/10 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-primary-200 uppercase tracking-widest">Imperial Citizens</h2>
          <p className="text-primary-400 font-medium text-xs uppercase tracking-widest opacity-60">Registry of all souls in the empire</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500/50" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-primary-500/20 rounded-2xl pl-12 pr-6 py-3 text-primary-100 placeholder:text-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold"
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-primary-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-500/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 md:px-8 py-5 text-left text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Citizen</th>
                <th className="px-4 md:px-8 py-5 text-left text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Guild Status</th>
                <th className="px-4 md:px-8 py-5 text-left text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Joined Since</th>
                <th className="px-4 md:px-8 py-5 text-right text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Decrees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/5">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-all group">
                  <td className="px-4 md:px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-royal-gradient flex items-center justify-center text-primary-100 font-black uppercase text-base md:text-lg shadow-glow-sm mr-3 md:mr-4">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-black text-primary-100 uppercase tracking-tight">{user.name}</div>
                        <div className="text-[10px] md:text-xs text-primary-400 flex items-center font-medium">
                          <Mail size={10} className="mr-1 md:mr-1.5 opacity-50" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      user.role === 'admin' 
                        ? 'bg-primary-500/20 text-primary-200 border-primary-500/30 shadow-glow-sm' 
                        : 'bg-white/5 text-primary-400 border-white/10'
                    }`}>
                      {user.role === 'admin' ? (
                        <><Shield size={10} className="mr-1.5" /> Royal Advisor</>
                      ) : (
                        <><Users size={10} className="mr-1.5" /> Citizen</>
                      )}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-[10px] text-primary-200 font-bold uppercase tracking-widest flex items-center">
                      <Calendar size={12} className="mr-2 opacity-40 text-primary-500" />
                      {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleRole(user)}
                        title={user.role === 'admin' ? 'Demote to Citizen' : 'Promote to Admin'}
                        className={`p-2 rounded-xl border transition-all ${
                          user.role === 'admin' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20' 
                            : 'bg-primary-500/10 text-primary-400 border-primary-500/20 hover:bg-primary-500/20 hover:text-primary-100'
                        }`}
                      >
                        {user.role === 'admin' ? <ShieldAlert size={16} /> : <Shield size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={user.email === 'muthugk@gmail.com'}
                        className={`p-2 bg-white/5 text-primary-500 hover:text-red-400 border border-primary-500/10 hover:border-red-500/30 rounded-xl transition-all ${user.email === 'muthugk@gmail.com' ? 'opacity-20 cursor-not-allowed' : ''}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-20 bg-white/2">
              <Users size={48} className="mx-auto text-primary-500/20 mb-4" />
              <p className="text-primary-500/50 font-black uppercase tracking-widest text-sm">No citizens match your search decree</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTab;
