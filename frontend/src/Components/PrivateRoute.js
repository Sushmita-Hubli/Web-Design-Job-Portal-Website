import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin, isAuthenticated, userType }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (isAdmin && userType() !== 'admin') {
    // If not admin but trying to access admin-only route
    return <Navigate to="/unauthorized" />;
  }

  return children; // Render the child component if authenticated and authorized
};

export default PrivateRoute;
