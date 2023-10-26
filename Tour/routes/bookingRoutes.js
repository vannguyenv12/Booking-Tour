const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router
  .route('/')
  .post(bookingController.setTourUserId, bookingController.createBooking)
  .get(bookingController.getAllBookings);

router.route('/:id').delete(bookingController.deleteBooking);

router.route('/user').get(bookingController.getAllBookingsByUser);

module.exports = router;
