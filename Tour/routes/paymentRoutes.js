const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router
  .route('/')
  .post(paymentController.setId, paymentController.createPayment)
  .get(paymentController.getAllPayments);

module.exports = router;
