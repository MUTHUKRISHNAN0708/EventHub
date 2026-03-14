import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const addBooking = async (req, res) => {
  try {
    const { venueId, eventType, eventDate, eventTime, guestCount, servicesSelected, totalAmount } = req.body;

    // Check availability
    const existingDate = await Booking.findOne({ venueId, eventDate, status: { $ne: 'Rejected' } });
    if (existingDate) {
      return res.status(400).json({ message: 'Date Unavailable for this vendor' });
    }

    const booking = new Booking({
      customerId: req.user._id,
      venueId,
      eventType,
      eventDate,
      eventTime,
      guestCount,
      servicesSelected,
      totalAmount,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id })
      .populate('venueId', 'name location')
      .populate('servicesSelected', 'name price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('customerId', 'name email')
      .populate('venueId', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check availability (Public)
// @route   POST /api/bookings/availability
// @access  Public
export const checkAvailability = async (req, res) => {
  try {
    const { venueId, eventDate } = req.body;
    const existingDate = await Booking.findOne({ venueId, eventDate, status: { $ne: 'Rejected' } });
    
    if (existingDate) {
      res.json({ available: false, message: 'Date Unavailable' });
    } else {
      res.json({ available: true, message: 'Date Available' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.customerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to cancel this booking' });
    }

    // Only allow cancellation of pending bookings
    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
    }

    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
