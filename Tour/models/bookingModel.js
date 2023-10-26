const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User must belong to user']
    },
    bookingData: {
      type: Date,
      default: Date.now()
    },
    bookingStatus: {
      type: String,
      enum: ['Non-paid', 'Paid'],
      default: 'Non-paid'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
