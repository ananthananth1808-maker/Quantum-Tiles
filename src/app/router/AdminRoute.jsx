import { Navigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../../entities/auth/model/authService';
import { AppRoutes } from '../../shared/routes';

export function AdminRoute({ children }) {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return children;
}
