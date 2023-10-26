import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CurrentUser = () => {
  //   const [name, setName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [photo, setPhoto] = useState('');
  const { data } = useSelector((state) => state.user);

  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          value={data.name}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Password"
          value={data.email}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Photo</label>
        <img src={data.photo} />
      </div>
      <Link className="btn btn-primary" to={'/'}>
        Back to home
      </Link>
    </div>
  );
};

export default CurrentUser;
