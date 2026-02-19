const express = require('express');
const router = express.Router();
const { createPayment, getMyPayments, getAllPayments } = require('../controllers/paymentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, createPayment);
router.get('/my', authenticateToken, authorizeRoles('member'), getMyPayments);
router.get('/all', authenticateToken, authorizeRoles('admin'), getAllPayments);

module.exports = router;
