import { store } from '../redux/store';
import axiosClient from './axiosClient';

export const loginApi = (email, password) => {
  return axiosClient.post('/users/login', {
    email,
    password,
  });
};

export const registerApi = (name, email, password, passwordConfirm) => {
  return axiosClient.post('/users/signup', {
    name,
    email,
    password,
    passwordConfirm,
  });
};

export const updatePasswordApi = (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  return axiosClient.patch(
    '/users/updateMyPassword',
    {
      passwordCurrent,
      password,
      passwordConfirm,
    },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};

export const getAllUsers = (page, limit) => {
  return axiosClient.get(`/users?page=${page}&limit=${limit}&sort=role`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const getUser = (userId) => {
  return axiosClient.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const getCurrentUser = () => {
  return axiosClient.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const updateUser = (userId, name, email, photo) => {
  console.log(store.getState().user.data.accessToken);
  return axiosClient.patch(
    `/users/${userId}`,
    { name, email, photo },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};

export const deleteUser = (userId) => {
  return axiosClient.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const getAllGuide = () => {
  return axiosClient.get(`/users?role=guide`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const getAllLeadGuide = () => {
  return axiosClient.get(`/users?role=lead-guide`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};
