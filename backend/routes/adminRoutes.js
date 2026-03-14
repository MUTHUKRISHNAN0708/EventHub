import express from 'express';
import { getAdminStats, getAllUsers, deleteUser, updateUserRole, getFinancialStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/stats')
  .get(protect, admin, getAdminStats);

router.route('/financials')
  .get(protect, admin, getFinancialStats);

router.route('/users')
  .get(protect, admin, getAllUsers);

router.route('/users/:id')
  .delete(protect, admin, deleteUser);

router.route('/users/:id/role')
  .put(protect, admin, updateUserRole);

export default router;
