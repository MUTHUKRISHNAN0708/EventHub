import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  category: { type: String, required: true },
  packageLevel: { 
    type: String, 
    enum: ['Premium', 'Standard', 'Basic', 'Custom'],
    default: 'Standard'
  },
  eventTypes: [{ type: String }], // e.g., ['Wedding', 'Birthday']
  price: { type: Number, required: true },
  description: { type: String },
  features: [{ type: String }],
}, { timestamps: true });

serviceSchema.index({ vendorId: 1 });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
