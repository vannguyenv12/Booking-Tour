import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: '',
      }}
    >
      <Link className="logo" to={'/'}>
        Trang Chủ
      </Link>

      {/* <div className="search">
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Search" />
        </div>
      </div> */}

      {isAuthenticated ? (
        <DropdownButton
          id="dropdown-basic-button"
          variant="info"
          title="Thông tin tài khoản"
        >
          <Link className="dropdown-item" to={'/currentUser'}>
            Xem thông tin
          </Link>
          <Link className="dropdown-item" to={'/updatePassword'}>
            Đổi mật khẩu
          </Link>

          <Link className="dropdown-item" to={'/booking'}>
            Danh sách tour đã book
          </Link>

          <Link className="dropdown-item" to={'/admin/manage-tour'}>
            Quản lý
          </Link>
        </DropdownButton>
      ) : (
        <div className="login">
          <Link to={'/register'}>Đăng ký</Link> /{' '}
          <Link to={'/login'}>Đăng nhập</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
