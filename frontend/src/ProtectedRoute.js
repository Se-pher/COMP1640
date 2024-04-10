import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Error404 from './Components/Error404';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userRole = decodedToken ? decodedToken.role : null;

  return (
    <>
      {token && allowedRoles.includes(userRole) ? (
        <Component {...rest} />
      ) : token ? (
        <Error404 />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;