import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { isAuth, data, loadingUser } = UserData();

  if (loadingUser) {
    return null;
  }

  if (!isAuth || !data?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
