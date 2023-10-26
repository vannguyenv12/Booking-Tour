import React, { useEffect, useState } from 'react';
import TourList from './TourList';
import Form from 'react-bootstrap/Form';

const Main = () => {
  const [difficult, setDifficult] = useState('');
  const [sort, setSort] = useState('');
  const [sortResult, setSortResult] = useState('');
  //   const [tourList, setTourList] = useState([]);

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="d-flex" style={{ gap: '10px' }}>
      <div className="left" style={{ width: '20%' }}>
        <h3>Lọc</h3>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setDifficult(e.target.value)}
        >
          <option>Chọn độ khó</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </Form.Select>

        <h3 className="m-5">Sắp xếp theo</h3>
        <Form onChange={handleChangeSort}>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Price"
            value={'price'}
          />
          <Form.Check // prettier-ignore
            type="switch"
            label="Rating"
            id="disabled-custom-switch"
            value={'ratingsAverage'}
          />
        </Form>
      </div>
      <div className="right" style={{ width: '80%' }}>
        <TourList difficult={difficult} sort={sort} />
      </div>
    </div>
  );
};

export default Main;
