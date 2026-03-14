import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Store, X, Camera, MapPin, Users, Mail, Phone, Tag } from 'lucide-react';
import api from '../utils/api';

const AdminVendorsTab = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorServices, setVendorServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    vendorType: 'Venue',
    description: '',
    capacity: 0,
    bannerImage: ''
  });

  // Service Form State
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    price: 0
  });

  const vendorTypes = [
    'Venue', 'Catering', 'Photography & Media', 'Music & Entertainment', 
    'Decor & Styling', 'Lighting & Technical', 'Beauty & Personal Services', 
    'Event Planning', 'Logistics & Support', 'Invitations & Gifts', 'Kids Entertainment'
  ];

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/vendors');
      setVendors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVendor) {
        await api.put(`/vendors/${editingVendor._id}`, formData);
      } else {
        await api.post('/vendors', formData);
      }
      setShowModal(false);
      resetForm();
      fetchVendors();
    } catch (error) {
      alert('Error saving vendor');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      vendorType: 'Venue',
      description: '',
      capacity: 0,
      bannerImage: ''
    });
    setEditingVendor(null);
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      location: vendor.location,
      vendorType: vendor.vendorType,
      description: vendor.description,
      capacity: vendor.capacity,
      bannerImage: vendor.bannerImage || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor and all their services? This action cannot be undone.')) {
      try {
        await api.delete(`/vendors/${id}`);
        fetchVendors();
      } catch (error) {
        alert('Error deleting vendor');
      }
    }
  };

  const handleManageServices = async (vendor) => {
    setSelectedVendor(vendor);
    setShowServiceModal(true);
    fetchVendorServices(vendor._id);
  };

  const fetchVendorServices = async (vendorId) => {
    try {
      setServiceLoading(true);
      const { data } = await api.get(`/services/vendor/${vendorId}`);
      setVendorServices(data);
      setServiceLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServiceLoading(false);
    }
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', { ...serviceFormData, vendorId: selectedVendor._id });
      setServiceFormData({ name: '', description: '', price: 0 });
      fetchVendorServices(selectedVendor._id);
    } catch (error) {
      alert('Error adding service');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Delete this service package?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchVendorServices(selectedVendor._id);
      } catch (error) {
        alert('Error deleting service');
      }
    }
  };

  if (loading && vendors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-primary-500/10 mb-8 gap-4 text-center sm:text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-primary-200 uppercase tracking-widest">Royal Registry</h2>
          <p className="text-primary-400 font-medium text-[10px] md:text-xs uppercase tracking-widest opacity-60">Management of all imperial vendors</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center justify-center gap-2 bg-royal-gradient text-primary-200 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-glow-sm transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={16} /> Add Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="bg-white/5 backdrop-blur-xl border border-primary-500/10 rounded-[2.5rem] overflow-hidden group hover:border-primary-500/30 transition-all flex flex-col shadow-xl">
            <div className="h-40 relative overflow-hidden">
              <img 
                src={vendor.bannerImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80'} 
                alt={vendor.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-midnight/60 backdrop-blur-md border border-primary-500/20 px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase text-primary-200 shadow-lg">
                {vendor.vendorType}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-4">
                <h3 className="text-xl font-black text-primary-100 uppercase tracking-tighter mb-1 leading-tight">{vendor.name}</h3>
                <div className="flex items-center text-[10px] text-primary-400 font-black uppercase tracking-widest opacity-60">
                  <MapPin size={10} className="mr-1" /> {vendor.location}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-primary-500/10 mt-auto gap-2">
                  <button 
                    onClick={() => handleManageServices(vendor)}
                    className="flex-1 flex items-center justify-center gap-2 bg-royal-gradient text-primary-200 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shadow-glow-sm"
                  >
                    <Tag size={12} /> Services
                  </button>
                  <button 
                    onClick={() => handleEdit(vendor)}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-primary-500/10 text-primary-300 hover:text-primary-100 border border-primary-500/10 hover:border-primary-500/30 py-2 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(vendor._id)}
                    className="p-2 flex items-center justify-center bg-white/5 hover:bg-red-500/10 text-primary-400 hover:text-red-400 border border-primary-500/10 hover:border-red-500/30 rounded-xl transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-midnight border border-primary-500/30 w-full max-w-2xl rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 mx-2">
            <div className="bg-white/5 px-6 md:px-8 py-4 md:py-6 border-b border-primary-500/10 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-black text-primary-200 uppercase tracking-tighter">
                {editingVendor ? 'Enthrone New Legend' : 'Forge New Venue'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-primary-500 hover:text-primary-100 transition-colors">
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Display Name</label>
                  <input 
                    name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                    placeholder="Enter vendor name..."
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Imperial Email</label>
                  <input 
                    name="email" value={formData.email} onChange={handleInputChange} required type="email"
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                    placeholder="vendor@empire.com"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Communication Link</label>
                  <input 
                    name="phone" value={formData.phone} onChange={handleInputChange} required
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                    placeholder="Phone number..."
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Strategic Location</label>
                  <input 
                    name="location" value={formData.location} onChange={handleInputChange} required
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                    placeholder="City / Area..."
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Guild Type</label>
                  <select 
                    name="vendorType" value={formData.vendorType} onChange={handleInputChange} required
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold appearance-none cursor-pointer text-sm"
                  >
                    {vendorTypes.map(t => <option key={t} value={t} className="bg-midnight">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Guest Capacity</label>
                  <input 
                    name="capacity" value={formData.capacity} onChange={handleInputChange} type="number"
                    className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                    placeholder="Max guests (0 if non-venue)..."
                  />
                </div>
              </div>
              
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Banner Visual URI</label>
                <input 
                  name="bannerImage" value={formData.bannerImage} onChange={handleInputChange}
                  className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                  placeholder="Image URL (Unsplash Link)..."
                />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Official Decree (Description)</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleInputChange} required rows="3"
                  className="w-full bg-white/5 border border-primary-500/20 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold resize-none text-sm"
                  placeholder="Tell the world about this legend..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-royal-gradient text-primary-200 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 md:mt-4"
              >
                {editingVendor ? 'Confirm Decree' : 'Initialize Legend'}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Service Management Modal */}
      {showServiceModal && selectedVendor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-md" onClick={() => setShowServiceModal(false)}></div>
          <div className="relative bg-midnight border border-primary-500/30 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-white/5 px-8 py-6 border-b border-primary-500/10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-primary-200 uppercase tracking-tighter">Imperial Offerings</h2>
                <p className="text-primary-400 text-xs font-black uppercase tracking-widest opacity-60">Managing packages for {selectedVendor.name}</p>
              </div>
              <button onClick={() => setShowServiceModal(false)} className="text-primary-500 hover:text-primary-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Existing Services List */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-primary-200 uppercase tracking-widest border-b border-primary-500/10 pb-2 flex items-center">
                  <Tag size={14} className="mr-2" /> Current Packages
                </h3>
                
                {serviceLoading ? (
                  <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div></div>
                ) : vendorServices.length === 0 ? (
                  <div className="text-center p-10 text-primary-500/40 font-black uppercase tracking-widest text-xs border border-dashed border-primary-500/20 rounded-3xl">
                    No packages defined yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {vendorServices.map(service => (
                      <div key={service._id} className="bg-white/5 border border-primary-500/10 p-4 rounded-2xl flex justify-between items-center group">
                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-primary-100 font-black uppercase tracking-tight truncate">{service.name}</h4>
                          <p className="text-[10px] text-primary-400 font-medium line-clamp-1">{service.description}</p>
                          <p className="text-lg font-black text-primary-500 tracking-tighter mt-1">${service.price}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteService(service._id)}
                          className="p-2 text-primary-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Service Form */}
              <div className="bg-white/3 p-6 rounded-3xl border border-primary-500/10">
                <h3 className="text-sm font-black text-primary-200 uppercase tracking-widest mb-6 flex items-center">
                  <Plus size={16} className="mr-2" /> Forge New Offering
                </h3>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Package Name</label>
                    <input 
                      name="name" value={serviceFormData.name} onChange={handleServiceInputChange} required
                      className="w-full bg-midnight border border-primary-500/20 rounded-2xl px-5 py-3 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-sm"
                      placeholder="e.g. Royal Platinum Feast"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Imperial Price ($)</label>
                    <input 
                      name="price" value={serviceFormData.price} onChange={handleServiceInputChange} required type="number"
                      className="w-full bg-midnight border border-primary-500/20 rounded-2xl px-5 py-3 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-black text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] ml-2">Package Decree</label>
                    <textarea 
                      name="description" value={serviceFormData.description} onChange={handleServiceInputChange} required rows="3"
                      className="w-full bg-midnight border border-primary-500/20 rounded-2xl px-5 py-3 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold text-xs resize-none"
                      placeholder="Describe the value..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-royal-gradient text-primary-200 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-glow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Enshrine Offering
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendorsTab;
