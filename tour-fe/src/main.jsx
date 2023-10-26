import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './pages/Error/error.jsx';
import Login from './pages/Login/Login.jsx';
import TourList from './pages/Tour/TourList.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Register from './pages/Register/Register.jsx';
import UpdatePassword from './pages/User/updatePassword.jsx';
import CurrentUser from './pages/User/CurrentUser.jsx';
import Main from './pages/Tour/Main.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import TourDetail from './pages/Tour/TourDetail.jsx';
import User from './pages/Admin/User.jsx';
import Tour from './pages/Admin/Tour.jsx';
import AddTour from './pages/Admin/AddTour.jsx';
import Booking from './pages/Booking/Booking.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import MainAdmin from './pages/Admin/MainAdmin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'tours/:tourId',
        element: <TourDetail />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'updatePassword',
        element: <UpdatePassword />,
      },
      {
        path: 'currentUser',
        element: <CurrentUser />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
      {
        path: 'manage-user',
        element: <User />,
      },
      {
        path: 'manage-tour',
        element: <Tour />,
      },
      {
        path: 'add-tour',
        element: <AddTour />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {/* <App /> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
