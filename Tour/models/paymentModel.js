const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    paymentType: {
      type: String,
      enum: ['Visa', 'Credit_Card', 'Paypal'],
      default: 'Visa'
    },
    cardNumber: {
      type: String
    },
    booking: {
      type: mongoose.Schema.ObjectId,
      ref: 'Booking',
      required: [true, 'Payment must belong to booking']
    },
    paymentDate: {
      type: Date,
      default: Date.now()
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Success'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
