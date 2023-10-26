/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addPayment } from '../../services/paymentApi';

const Payment = ({ bookingsId, fetchAllBookingsUser }) => {
  const [paymentType, setPaymentType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handlePayment = async () => {
    for (const id of bookingsId) {
      try {
        const res = await addPayment(id, paymentType);
        console.log(res);
      } catch (error) {
        console.log('failed to add payment', error);
      }
    }

    await fetchAllBookingsUser();
  };

  return (
    <div style={{ border: '2px solid', padding: '10px' }}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Payment Type</label>
        <select
          className="form-select"
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="Visa" defaultChecked>
            Visa
          </option>
          <option value="Credit_Card">Credit Card</option>
          <option value="Paypal">Paypal</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Card Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handlePayment}>
        Submit
      </button>
    </div>
  );
};

export default Payment;
