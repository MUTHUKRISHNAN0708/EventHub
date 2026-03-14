import Vendor from '../models/Vendor.js';
import Service from '../models/Service.js';

// @desc    Fetch all vendors
// @route   GET /api/vendors
// @access  Public
export const getVendors = async (req, res) => {
  try {
    const { keyword, type, eventType } = req.query;
    const query = {};

    if (keyword && keyword.trim() !== '') {
      const searchRegex = { $regex: keyword, $options: 'i' };
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { vendorType: searchRegex }
      ];
    }

    if (type && type.trim() !== '') {
      query.vendorType = type;
    }

    if (eventType && eventType.trim() !== '') {
      query.eventTypes = eventType;
    }

    const vendorsList = await Vendor.find(query);
    
    // Optimize: Fetch all services for these vendors in one go
    const vendorIds = vendorsList.map(v => v._id);
    const allServices = await Service.find({ vendorId: { $in: vendorIds } });

    // Enrich vendors with starting price and package count from the batched services
    const enrichedVendors = vendorsList.map(vendor => {
      const vendorServices = allServices.filter(s => s.vendorId.toString() === vendor._id.toString());
      const minPrice = vendorServices.length > 0 ? Math.min(...vendorServices.map(s => s.price)) : 0;
      return {
        ...vendor._doc,
        startingPrice: minPrice,
        packageCount: vendorServices.length
      };
    });

    res.json(enrichedVendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single vendor with services
// @route   GET /api/vendors/:id
// @access  Public
export const getVendorById = async (req, res) => {
  try {
    const [vendor, services] = await Promise.all([
      Vendor.findById(req.params.id),
      Service.find({ vendorId: req.params.id })
    ]);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.json({ vendor, services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a vendor (Admin)
// @route   POST /api/vendors
// @access  Private/Admin
export const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const createdVendor = await vendor.save();
    res.status(201).json(createdVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a vendor (Admin)
// @route   PUT /api/vendors/:id
// @access  Private/Admin
export const updateVendor = async (req, res) => {
  try {
    const { name, email, phone, location, vendorType, description, capacity, bannerImage } = req.body;

    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      vendor.name = name || vendor.name;
      vendor.email = email || vendor.email;
      vendor.phone = phone || vendor.phone;
      vendor.location = location || vendor.location;
      vendor.vendorType = vendorType || vendor.vendorType;
      vendor.description = description || vendor.description;
      if (capacity !== undefined) vendor.capacity = capacity;
      if (bannerImage !== undefined) vendor.bannerImage = bannerImage;

      const updatedVendor = await vendor.save();
      res.json(updatedVendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a vendor and its services (Admin)
// @route   DELETE /api/vendors/:id
// @access  Private/Admin
export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (vendor) {
      // First delete all services associated with this vendor
      await Service.deleteMany({ vendorId: req.params.id });
      
      // Then delete the vendor
      await vendor.deleteOne();
      res.json({ message: 'Vendor and associated services removed' });
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
