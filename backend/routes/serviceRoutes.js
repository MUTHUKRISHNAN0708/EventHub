import express from 'express';
import { createService, deleteService, getServicesByVendorId } from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createService);

router.route('/:id')
  .delete(protect, admin, deleteService);

router.route('/vendor/:vendorId')
  .get(getServicesByVendorId);

export default router;
