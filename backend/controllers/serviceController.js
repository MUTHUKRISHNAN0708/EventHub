import Service from '../models/Service.js';

// @desc    Get all services for a vendor
// @route   GET /api/services/vendor/:vendorId
// @access  Public
export const getServicesByVendorId = async (req, res) => {
  try {
    const services = await Service.find({ vendorId: req.params.vendorId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a service (Admin)
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a service (Admin)
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Service package removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
