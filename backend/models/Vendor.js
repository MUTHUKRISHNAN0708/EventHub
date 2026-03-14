import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  capacity: { type: Number, default: 0 },
  vendorType: { type: String, required: true }, // e.g., Venue, Catering, Photography
  description: { type: String },
  bannerImage: { type: String },
  eventTypes: [{ type: String }],
  gallery: [{ type: String }],
}, { timestamps: true });

vendorSchema.index({ vendorType: 1 });
vendorSchema.index({ eventTypes: 1 });

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
