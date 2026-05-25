import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../../common/store/store';
import { ROUTES } from '../routePaths';

export const PublicRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const { pathname } = useLocation();

  if (pathname === '/ecommerce') return <Navigate to={ROUTES.ecommerce} replace />;
  return isAuthenticated ? <Navigate to={ROUTES.ecommerce} replace /> : <Outlet />;
};
