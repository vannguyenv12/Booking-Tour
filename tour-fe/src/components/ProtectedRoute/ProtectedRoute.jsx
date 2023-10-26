import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate('');

  const fetchCurrentUser = async () => {
    const res = await getCurrentUser();
    if (res.data.data.role != 'admin') {
      navigate('/');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoute;
