import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // specifically the venue
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  guestCount: { type: Number, required: true },
  servicesSelected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

bookingSchema.index({ venueId: 1, eventDate: 1 });
bookingSchema.index({ customerId: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
