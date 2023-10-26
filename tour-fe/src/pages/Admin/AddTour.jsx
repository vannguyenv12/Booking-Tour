import React, { useDebugValue, useEffect, useState } from 'react';
import { createTour } from '../../services/tourApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllGuide } from '../../services/userApi';
import { getImage } from '../../utils/common';

const AddTour = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [maxGroupSize, setMaxGroupSize] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [price, setPrice] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [date, setDate] = useState();

  const [guides, setGuides] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);

  const navigate = useNavigate();

  const fetchGuides = async () => {
    try {
      const res = await getAllGuide();
      const data = res.data.data;
      setGuides(res.data.data);

      const dataMap = data.map((c) => {
        return { label: c.name, value: c._id, isChecked: false };
      });
      setCheckboxes(dataMap);
    } catch (error) {
      console.log('failed to fetch guide', error);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleAddTour = async () => {
    const guidesId = checkboxes.map((c) => {
      if (c.isChecked) return c.value;

      return null;
    });
    console.log(guidesId);

    try {
      const res = await createTour(
        name,
        duration,
        maxGroupSize,
        difficulty,
        price,
        summary,
        description,
        getImage(),
        guidesId,
        [new Date(date)]
      );

      navigate('/admin/manage-tour');
    } catch (error) {
      console.log('failed to create tour', error);
    }
  };

  const handleChange = (index) => {
    const cloneCheckBox = [...checkboxes];
    cloneCheckBox[index].isChecked = !cloneCheckBox[index].isChecked;
    setCheckboxes(cloneCheckBox);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="exampleInputEmail1">Thời gian</label>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Thành viên tối đa</label>
        <input
          type="number"
          className="form-control"
          value={maxGroupSize}
          onChange={(e) => setMaxGroupSize(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Độ khó</label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Chọn độ khó</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Giá</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Tóm tắt</label>
        <input
          type="text"
          className="form-control"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Mô tả</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Nhập ngày</label>
        <input
          type="text"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="form-check">
          {checkboxes.length > 0 &&
            checkboxes.map((g, index) => {
              return (
                <div key={g.value} style={{ color: 'blue' }}>
                  <input
                    className="form-check-input m-2"
                    type="checkbox"
                    value={g.value}
                    id="flexCheckChecked"
                    checked={g.isChecked}
                    onChange={() => handleChange(index)}
                    style={{ accentColor: '#9b59b6' }}
                  />
                  <label className="form-check-label">{g.label}</label>
                </div>
              );
            })}
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleAddTour}>
        Submit
      </button>
    </div>
  );
};

export default AddTour;
