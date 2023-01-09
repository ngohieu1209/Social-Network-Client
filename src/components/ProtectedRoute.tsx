import React from 'react';
import { Navigate, Outlet } from 'react-router';

type ProtectedProps = {
  isLogged: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({ isLogged, redirectPath='/signin' }: ProtectedProps) => {
  return isLogged ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;