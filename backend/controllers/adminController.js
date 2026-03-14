import Booking from '../models/Booking.js';
import Vendor from '../models/Vendor.js';
import User from '../models/User.js';

// @desc    Get comprehensive admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });

    // Calculate total revenue from 'Approved' bookings
    const bookings = await Booking.find({ status: 'Approved' });
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
    
    // Most popular event types
    const eventTypeData = await Booking.aggregate([
      { $group: { _id: "$eventType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 }
    ]);

    res.json({
      totalVendors,
      totalBookings,
      pendingBookings,
      totalRevenue,
      popularEvents: eventTypeData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin' && user.email === 'muthugk@gmail.com') {
        return res.status(400).json({ message: 'Primary Admin cannot be deleted' });
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get detailed financial analytics
// @route   GET /api/admin/financials
// @access  Private/Admin
export const getFinancialStats = async (req, res) => {
  try {
    // Revenue by Vendor
    const revenueByVendor = await Booking.aggregate([
      { $match: { status: 'Approved' } },
      {
        $group: {
          _id: "$venueId",
          totalRevenue: { $sum: "$totalAmount" },
          bookingCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails"
        }
      },
      { $unwind: "$vendorDetails" },
      {
        $project: {
          name: "$vendorDetails.name",
          totalRevenue: 1,
          bookingCount: 1
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    // Revenue by Event Type
    const revenueByEventType = await Booking.aggregate([
      { $match: { status: 'Approved' } },
      {
        $group: {
          _id: "$eventType",
          totalRevenue: { $sum: "$totalAmount" },
          bookingCount: { $sum: 1 }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    // Monthly Revenue (Last 6 Months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyRevenue = await Booking.aggregate([
      { $match: { status: 'Approved', createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      revenueByVendor,
      revenueByEventType,
      monthlyRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
