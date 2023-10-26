/* eslint-disable react/prop-types */
import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const TourPreview = ({ tour }) => {
  return (
    <Card style={{ width: '17rem' }}>
      <Card.Img
        variant="top"
        style={{ width: '200px', height: '300px' }}
        src={tour.imageCover}
      />
      <Card.Body>
        <Card.Title>{tour.name}</Card.Title>
        <Card.Text>
          {tour.description.length > 60
            ? `${tour.description.substring(0, 60)}...`
            : tour.description}
        </Card.Text>
        <Link
          className="btn btn-primary"
          variant="primary"
          to={`tours/${tour._id}`}
        >
          Xem chi tiết
        </Link>
      </Card.Body>
    </Card>
  );
};

export default TourPreview;
