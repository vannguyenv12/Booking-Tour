import axiosClient from './axiosClient';
import { store } from '../redux/store';

export const addReview = (tourId, review, rating) => {
  return axiosClient.post(
    `/tours/${tourId}/reviews`,
    { review, rating },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};
