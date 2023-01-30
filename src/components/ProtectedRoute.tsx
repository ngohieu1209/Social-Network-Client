import { Navigate, Outlet } from 'react-router';

type ProtectedProps = {
  isAllow: boolean;
  redirectPath?: string;
  loading?: boolean;
}

const ProtectedRoute = ({ isAllow, redirectPath='signin', loading=false }: ProtectedProps) => {
  return isAllow ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;