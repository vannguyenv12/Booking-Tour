import React, { useEffect, useState } from 'react';
import {
  deleteTour,
  getAllTours,
  getAllToursPage,
  getTourDetail,
  updateTour,
} from '../../services/tourApi';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [tour, setTour] = useState({});

  const [length, setLength] = useState(0);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [duration, setDuration] = useState('');
  const [photo, setPhoto] = useState('');
  const [sort, setSort] = useState('name');

  const [indexPage, setIndexPage] = useState(1);

  const [search, setSearch] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchTours = async () => {
    const res = await getAllTours();
    //setTours(res.data.data);
    setLength(res.data.data.length);
  };

  const fetchToursWithPage = async () => {
    const res = await getAllToursPage(indexPage, 6, sort, search);
    setTours(res.data.data);
  };

  useEffect(() => {
    fetchTours();
    fetchToursWithPage();
  }, [indexPage, search]);

  const showSingleTour = async (tourId) => {
    handleShow();
    const res = await getTourDetail(tourId);
    const data = res.data.data;

    setTour(data);
    setName(data.name);
    setDescription(data.description);
    setSummary(data.summary);
    setDuration(data.duration);
  };

  const handleUpdateTour = async () => {
    const res = await updateTour(
      tour._id,
      name,
      description,
      summary,
      duration
    );
    await fetchToursWithPage();
    handleClose();
  };

  const handleDeleteTour = async (tourId) => {
    try {
      await deleteTour(tourId);
      await fetchToursWithPage();
    } catch (error) {
      console.log('failed to delete tour', error);
    }
  };

  const handlePageChange = (index) => {
    console.log(index);
    setIndexPage(index);
  };

  const handleSortByName = async () => {
    setSort((sort) => (sort === 'name' ? '-name' : 'name'));
    await fetchToursWithPage();
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    // await fetchToursWithPage(sort);
  };

  return (
    <div>
      <Link className="btn btn-success p-2" to={'/admin/add-tour'}>
        Thêm tour
      </Link>
      <div className="m-3">
        <input
          placeholder="Tìm theo tên"
          style={{ padding: '20px' }}
          onInput={(e) => handleSearch(e)}
          value={search}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={handleSortByName}>
              Tên
            </th>
            <th scope="col">Mô tả</th>
            <th scope="col">Tóm tắt</th>
            <th scope="col">Thời gian (ngày)</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours?.map((item) => {
            return (
              <tr key={item._id}>
                <th scope="row">{item.name}</th>
                <td>{item.description}</td>
                <td>{item.summary}</td>
                <td>{item.duration}</td>
                <td>
                  <img width={'100px'} height={'100px'} src={item.imageCover} />
                </td>
                <td>
                  <button
                    className="btn btn-success mx-1"
                    onClick={() => showSingleTour(item._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTour(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {[...new Array(Math.ceil(length / 6))].map((num, index) => {
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="exampleInputEmail1">Mô tả</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="exampleInputEmail1">Tóm tắt</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <label htmlFor="exampleInputEmail1">Thời gian (ngày)</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              {/* <label htmlFor="exampleInputEmail1">Ảnh</label>
              <input className="form-control" type="file" id="formFile" /> */}
            </div>
            <div className="preview-img">
              <img />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTour}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tour;
