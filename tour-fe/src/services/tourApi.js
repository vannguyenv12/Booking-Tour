import axiosClient from './axiosClient';
import { store } from '../redux/store';

export const getAllTours = (difficulty, sort, limit, page) => {
  let params = { sort, limit, page };
  if (difficulty) {
    params = { ...params, difficulty };
  }
  return axiosClient.get('/tours', {
    params,
  });
};

export const getAllToursPage = (page, limit, sort, name) => {
  // const url = !name ? '' : `name=${name}`;
  return axiosClient.get(`/tours`, {
    params: { page, limit, sort, name },
  });
};

export const getTourDetail = (tourId) => {
  return axiosClient.get(`/tours/${tourId}`);
};

export const updateTour = (tourId, name, description, summary, duration) => {
  return axiosClient.patch(
    `/tours/${tourId}`,
    { name, description, summary, duration },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};

export const createTour = (
  name,
  duration,
  maxGroupSize,
  difficulty = 'easy',
  price,
  summary,
  description,
  imageCover = 'default.png',
  guides,
  startDates
) => {
  return axiosClient.post(
    `/tours`,
    {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      imageCover,
      guides,
      startDates,
    },
    {
      headers: {
        Authorization: `Bearer ${store.getState().user.data.accessToken}`,
      },
    }
  );
};

export const deleteTour = (tourId) => {
  return axiosClient.delete(`/tours/${tourId}`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};

export const getTourStats = () => {
  return axiosClient.get(`/tours/tour-stats`, {
    headers: {
      Authorization: `Bearer ${store.getState().user.data.accessToken}`,
    },
  });
};
