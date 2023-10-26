import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTourDetail } from '../../services/tourApi';
import Card from 'react-bootstrap/Card';
import './Tour.css';

import { AiFillStar } from 'react-icons/ai';
import { addReview } from '../../services/reviewApi';
import { toast } from 'react-toastify';
import { addBooking, getBookingsByUser } from '../../services/bookingApi';

const TourDetail = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState({});

  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState('');

  const [isBookedIndex, setIsBookedIndex] = useState(-1);

  const handleStarClick = (value) => {
    setRating(value);
    console.log(value);
  };

  async function fetchTourDetail() {
    const res = await getTourDetail(tourId);
    console.log(res);
    setTour(res.data.data);
  }

  async function fetchAllBookingsUser() {
    const res = await getBookingsByUser();
    const isBookedIndex = res.findIndex(
      (booking) => booking.tour._id === tourId
    );
    setIsBookedIndex(isBookedIndex);
  }

  useEffect(() => {
    fetchTourDetail();
    fetchAllBookingsUser();
  }, []);

  const handleAddReview = async () => {
    try {
      console.log(rating);
      const res = await addReview(tourId, reviewMsg, rating);
      setReviewMsg('');
      await fetchTourDetail();
    } catch (error) {
      if (error?.response?.data?.message.startsWith('E11000')) {
        toast.error('Một người không thể thêm 2 reviews');
      }
      console.log('failed to add review', error.response.data.message);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await addBooking(tourId);
      await fetchAllBookingsUser();
    } catch (error) {
      console.log('failed to booking', error);
    }
  };

  return (
    <div>
      <div>
        {isBookedIndex > -1 ? (
          <button className="btn btn-warning" disabled onClick={handleBooking}>
            Đã book
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleBooking}>
            Booking
          </button>
        )}
      </div>
      <h2 className="tour-name">{tour.name}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '450px',
        }}
      >
        <img src={tour.imageCover} width={'100%'} height={'100%'} />
      </div>
      <div className="m-4">
        <p className="description">Mô tả: {tour.description}</p>
      </div>
      <div>
        <p className="summary">Tóm tắt: {tour.description}</p>
      </div>

      <div className="m-3">
        <h4>Chọn ngày</h4>
        <select className="form-select" aria-label="Default select example">
          {tour?.startDates?.map((date) => {
            return (
              <option value={date} key={date}>
                {`${new Date(date).getDate()}/${new Date(
                  date
                ).getMonth()}/${new Date(date).getFullYear()}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className="content">
        <div className="info">
          <div>
            <p className="duration">Thời gian đi: {tour.duration} ngày</p>
          </div>
          <div>
            <p className="ratings">
              Đánh giá: {tour.ratingsAverage}{' '}
              <AiFillStar size={28} color="orange" />
            </p>
          </div>
          <div>
            <p className="ratings">Số lượng Đánh giá: {tour.ratingsQuantity}</p>
          </div>
        </div>
      </div>
      <p className="m-2">Hướng dẫn viên du lịch</p>
      <div className="guides p-3">
        {tour?.guides?.map((guide) => {
          return (
            <div className="card" key={guide?._id}>
              <div className="card_img">
                <img src={guide?.photo} alt="user-image" />
              </div>
              <div className="card_info">
                <h4>{guide?.name}</h4>
              </div>
            </div>
          );
        })}
      </div>
      <p>Tất cả Đánh giá</p>
      <div className="reviews">
        {tour?.reviews?.map((review) => {
          return (
            <Card key={review?._id}>
              <Card.Header>Review</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p> {review?.review}. </p>
                  <p>
                    {[...new Array(review?.rating)].map((_, index) => {
                      return (
                        <AiFillStar key={index} size={28} color="orange" />
                      );
                    })}
                  </p>
                  <footer className="blockquote-footer">
                    By <cite title="Source Title">{review?.user?.name}</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
        {tour?.reviews?.length <= 0 && <h4>Chưa có review nào</h4>}
      </div>

      <p>Đánh giá</p>
      <div>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index + 1)}
            onMouseEnter={() => setRating(index + 1)}
            // onMouseLeave={() => setRating(0)}
            style={{
              cursor: 'pointer',
              color: index < rating ? 'gold' : 'gray',
              fontSize: '32px',
            }}
          >
            &#9733;
          </span>
        ))}
        <div>
          <textarea
            style={{ background: 'white', color: 'black' }}
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <button className="btn btn-success" onClick={handleAddReview}>
          Đánh giá
        </button>
      </div>
    </div>
  );
};

export default TourDetail;
