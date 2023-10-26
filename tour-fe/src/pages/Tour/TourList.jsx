/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import TourPreview from './TourPreview';
import { getAllTours } from '../../services/tourApi';

const TourList = ({ difficult, sort }) => {
  const [tourList, setTourList] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  console.log(sort);

  useEffect(() => {
    console.log('change sort useEff');
    async function getTourList() {
      try {
        // const response =
        //   difficult.length === 0 || difficult === 'Chọn độ khó'
        //     ? await getAllTours()
        //     : await getAllTours(difficult, sort);

        let response = null;
        if (difficult.length > 0 && difficult !== 'Chọn độ khó') {
          if (sort) {
            response = await getAllTours(difficult, sort);
            setCountItems(response.results);
          }
        }
        // if (sort && difficult.length > 0 && difficult !== 'Chọn độ khó') {
        //   response = await getAllTours(difficult, sort);
        //   setCountItems(response.results);
        // }

        if (difficult.length > 0 && difficult !== 'Chọn độ khó') {
          response = await getAllTours(difficult, undefined, 3, indexPage);
          setCountItems(response.results);
        }

        if (difficult.length === 0 || difficult === 'Chọn độ khó') {
          response = await getAllTours(undefined, undefined, 3, indexPage);
          const resp = await getAllTours();
          setCountItems(resp.results);
        }

        if (sort) {
          response = await getAllTours(difficult, sort, 3, indexPage);
          const resp = await getAllTours();
          setCountItems(resp.results);
        }

        setTourList(response.data.data);
      } catch (error) {
        console.log('get tour list error', error);
      }
    }

    getTourList();
  }, [difficult, sort, indexPage]);

  const handlePageChange = (index) => {
    console.log(index);
    setIndexPage(index);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          width: '100vw',
        }}
      >
        {tourList.length > 0 &&
          tourList.map((tour) => {
            return <TourPreview tour={tour} key={tour.id} />;
          })}
      </div>

      {[...new Array(Math.ceil(countItems / 3))].map((num, index) => {
        return (
          <button
            key={index}
            className="btn btn-primary m-1"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default TourList;
