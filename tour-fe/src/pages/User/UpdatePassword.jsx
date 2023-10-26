import React, { useState } from 'react';
import { updatePasswordApi } from '../../services/userApi';
import { store } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    console.log(store.getState());

    try {
      const res = await updatePasswordApi(
        currentPassword,
        password,
        confirmPassword
      );

      //   console.log(res);
      navigate('/login');
      toast.success('Đổi mật khẩu thành công! Hãy đăng nhập lại');

      //   dispatch(doRegister(res));
      //   toast.success('Đăng ký thành công!');
      //   navigate('/');
    } catch (error) {
      console.log('create user error', error);
      toast.error('Đổi mật khẩu không thành công, thử lại đi');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Current Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Name"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdatePassword}>
        Submit
      </button>
    </div>
  );
};

export default UpdatePassword;
