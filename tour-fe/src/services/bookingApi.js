import axiosClient from './axiosClient';
import { store } from '../redux/store';

export const addBooking = (tour) => {
  return axiosClient.post(
    `/bookings`,
    { tour },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};

export const getBookingsByUser = () => {
  return axiosClient.get(`/bookings/user`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const deleteBooking = (bookingId) => {
  return axiosClient.delete(`/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};
