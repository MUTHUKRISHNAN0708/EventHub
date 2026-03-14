import express from 'express';
import { getVendors, getVendorById, createVendor, updateVendor, deleteVendor } from '../controllers/vendorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getVendors).post(protect, admin, createVendor);
router.route('/:id')
  .get(getVendorById)
  .put(protect, admin, updateVendor)
  .delete(protect, admin, deleteVendor);

export default router;
