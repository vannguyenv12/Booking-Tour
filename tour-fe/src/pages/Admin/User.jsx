import { useEffect, useState } from 'react';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../services/userApi';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const User = () => {
  const [user, setUser] = useState({});
  const [length, setLength] = useState(0);

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');

  const [indexPage, setIndexPage] = useState(1);

  async function fetchUsersWithParam() {
    try {
      const res = await getAllUsers(indexPage, 5);
      setUsers(res.data.data);
    } catch (error) {
      console.log('failed to fetch all user', error);
    }
  }

  async function fetchUsers() {
    try {
      const res = await getAllUsers();
      setLength(res.data.data.length);
    } catch (error) {
      console.log('failed to fetch all user', error);
    }
  }

  useEffect(() => {
    fetchUsersWithParam();
    fetchUsers();
  }, [indexPage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showSingleUser = async (userId) => {
    handleShow();
    try {
      const res = await getUser(userId);
      const data = res?.data?.data;
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      setPhoto(data.photo);
      setUser(data);
    } catch (error) {
      console.log('failed to fetch user', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await updateUser(user._id, name, email, photo);
      console.log(res.data.data);
      console.log(user);
      toast.success('Cập nhật user thành công');
      handleClose();
      const res2 = await fetchUsersWithParam();
      setUsers(res2.data.data);
    } catch (error) {
      console.log('failed to update user', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const res2 = await fetchUsersWithParam();
      setUsers(res2.data.data);
    } catch (error) {
      console.log('failed to delete user', error);
    }
  };

  const handlePageChange = (index) => {
    console.log(index);
    setIndexPage(index);
  };

  return (
    <div>
      <h2>Quản lý User</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user._id}>
                <th scope="row">{user.role}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img width={'100px'} height={'100px'} src={user.photo} />
                </td>
                <td>
                  <button
                    className="btn btn-success mx-1"
                    onClick={() => showSingleUser(user._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {[...new Array(Math.ceil(length / 5))].map((num, index) => {
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Role</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={role}
                readOnly
                disabled
              />
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
              {/* <label htmlFor="exampleInputEmail1">Ảnh</label>
              <input className="form-control" type="file" id="formFile" /> */}
            </div>
            {/* <div className="preview-img">
              preview here
              <img />
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
