import { Navigate } from 'react-router-dom';
import { isAuthenticated, isCustomer } from '../../entities/auth/model/authService';
import { AppRoutes } from '../../shared/routes';

export function CustomerRoute({ children }) {
  if (!isAuthenticated() || !isCustomer()) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return children;
}
