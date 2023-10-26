import { useEffect, useState } from 'react';
import { deleteBooking, getBookingsByUser } from '../../services/bookingApi';
import Payment from '../Payment/payment';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingsId, setBookingsId] = useState([]);

  async function fetchAllBookingsUser() {
    const res = await getBookingsByUser();
    console.log(res);
    setBookings(res);

    const bookingsId = res.map((booking) => booking._id);
    setBookingsId(bookingsId);
  }

  useEffect(() => {
    fetchAllBookingsUser();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await deleteBooking(bookingId);
      await fetchAllBookingsUser();
    } catch (error) {
      console.log('failed to delete booking', error);
    }
  };

  return (
    <div>
      <h1>Danh Sách Các Tour Đã Book</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tên Tour</th>
            <th scope="col">Giá</th>
            <th scope="col">Trạng Thái</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            return (
              <tr key={booking._id}>
                <th scope="row">{booking.tour.name}</th>
                <td>{booking.tour.price}</td>
                <td>{booking.bookingStatus}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBooking(booking._id)}
                    disabled={booking.bookingStatus === 'Paid'}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn btn-primary">Thanh toán</button>
      <Payment
        bookingsId={bookingsId}
        fetchAllBookingsUser={fetchAllBookingsUser}
      />
    </div>
  );
};

export default Booking;
