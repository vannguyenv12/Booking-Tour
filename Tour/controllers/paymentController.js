const Payment = require('../models/paymentModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.createPayment = catchAsync(async (req, res, next) => {
  console.log(req.body.booking);
  const bookings = await Booking.findOneAndUpdate(
    { _id: req.body.booking },
    { bookingStatus: 'Paid' },
    {
      new: true,
      runValidators: true
    }
  );

  const doc = await Payment.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getAllPayments = factory.getAll(Payment);
