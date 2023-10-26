import axiosClient from './axiosClient';
import { store } from '../redux/store';

export const addPayment = (booking, paymentType) => {
  return axiosClient.post(
    `/payments`,
    { booking, paymentType },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};
