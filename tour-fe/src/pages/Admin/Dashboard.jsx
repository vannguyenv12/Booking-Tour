import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container">
      <div className="left">
        <div>
          <Link className="btn btn-warning" to={'/admin/manage-tour'}>
            Quản lý tour
          </Link>
        </div>
        <div>
          <Link className="btn btn-warning" to={'/admin/manage-user'}>
            Quản lý user
          </Link>
        </div>
        <Link className="btn btn-success" to={'/'}>
          Quay về trang chủ
        </Link>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
