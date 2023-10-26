import { useState } from 'react';
import { registerApi } from '../../services/userApi';
import { doRegister } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerApi(name, email, password, confirmPassword);

      dispatch(doRegister(res));
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (error) {
      console.log('create user error', error);
      toast.error('Mật khẩu không hợp lệ, vui lòng thử lại');
    }
  };
  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
      <button className="btn btn-primary" onClick={handleRegister}>
        Submit
      </button>
    </div>
  );
};

export default Register;
