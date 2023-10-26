import { useEffect, useState } from 'react';
import { getTourStats } from '../../services/tourApi';
import { formatNumber } from '../../utils/common';

const MainAdmin = () => {
  const [stats, setStats] = useState([]);
  const fetchTourStats = async () => {
    const res = await getTourStats();
    console.log(res.data.stats);
    setStats(res.data.stats);
  };

  useEffect(() => {
    fetchTourStats();
  }, []);

  return (
    <div>
      <h1 className="m-5">Thống kê theo độ khó</h1>
      <div
        className="d-flex"
        style={{
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        {stats.map((item) => {
          return (
            <div
              key={item._id}
              style={{ border: '1px solid black', padding: '20px' }}
            >
              <h4>Độ khó: {item._id}</h4>
              <p>Số lượng: {item.numTours}</p>
              <p>Số người đánh giá: {item.numRatings}</p>
              <p>Đánh giá trung bình: {formatNumber(item.avgRating)}</p>
              <p>Giá trung bình: {formatNumber(item.avgPrice)}</p>
              <p>Giá lớn nhất: {item.maxPrice}</p>
              <p>Giá nhỏ nhất: {item.minPrice}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainAdmin;
