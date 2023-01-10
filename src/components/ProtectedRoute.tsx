import { Navigate, Outlet } from 'react-router';

type ProtectedProps = {
  logged: boolean;
  redirectPath?: string;
  loading?: boolean;
}

const ProtectedRoute = ({ logged, redirectPath='signin', loading=false }: ProtectedProps) => {
  return logged ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;