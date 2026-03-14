import express from 'express';
import { 
  addBooking, 
  getMyBookings, 
  getBookings, 
  updateBookingStatus, 
  checkAvailability,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addBooking).get(protect, admin, getBookings);
router.route('/my-bookings').get(protect, getMyBookings);
router.route('/availability').post(checkAvailability);
router.route('/:id').delete(protect, cancelBooking);
router.route('/:id/status').put(protect, admin, updateBookingStatus);

export default router;
