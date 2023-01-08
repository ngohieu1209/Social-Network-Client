import React from 'react';
import { Navigate, Outlet } from 'react-router';

type ProtectedProps = {
  isLogged: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const ProtectedRoute = ({ isLogged, redirectPath='/signin', children }: ProtectedProps) => {
  if(!isLogged) return <Navigate to={redirectPath} replace />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;