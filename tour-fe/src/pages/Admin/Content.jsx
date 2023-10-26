import React from 'react';

const Content = () => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button className="btn btn-primary">Submit</button>
    </div>
  );
};

export default Content;
