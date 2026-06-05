import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../entities/auth/model/authService';
import { AppRoutes } from '../../shared/routes';

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return children;
}
