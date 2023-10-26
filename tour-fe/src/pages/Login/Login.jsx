import React, { useState } from 'react';
import { loginApi } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginApi(email, password);
      dispatch(doLogin(res));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.log('create user error', error);
      toast.error('Đăng nhập thất bại, thử lại đi!');
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <button className="btn btn-primary" onClick={handleLogin}>
        Submit
      </button>
    </div>
  );
};

export default Login;
