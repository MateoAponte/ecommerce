import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routePaths';

import { NotFoundPage } from '../layout/NotFound';
import type { ReactNode } from 'react';
import { PublicRoute } from './components/PublicRoute';
import { ProtectedRoute } from './components/ProtectedRoutes';
import { PrivateLayout } from '../layout/PrivateLayout';
import { Auth } from '../auth/views/Auth';
import { Shopping } from '../features/shopping/views/Shopping';
import { PublicLayout } from '../layout/PublicLayout';
import { OrderProcessingPage } from '../features/orderProcessing/views/OrderProcessingPage';

export type AppLayout = 'public' | 'private' | 'system';

export interface AppRouteConfig {
  path: string;
  element: ReactNode;
  layout?: AppLayout;
  isPrivate?: boolean;
  roles?: number[];
  permissions?: number[];
}

export const appRoutes: AppRouteConfig[] = [
  { path: ROUTES.auth, element: <Auth />, layout: 'public' },
  { path: ROUTES.ecommerce, element: <Shopping />, layout: 'private' },
  { path: ROUTES.orderProcessing, element: <OrderProcessingPage />, layout: 'private' },
  { path: '*', element: <NotFoundPage />, layout: 'system' },
];

export const AppRouter = () => {
  const publicRoutes = appRoutes.filter((route) => route.layout === 'public');
  const privateRoutes = appRoutes.filter((route) => route.layout === 'private');
  const systemRoutes = appRoutes.filter((route) => route.layout === 'system');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            {publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route) => {
              const hasAccessRules =
                (route.roles?.length ?? 0) > 0 || (route.permissions?.length ?? 0) > 0;
              if (hasAccessRules) {
                return (
                  // <Route
                  //   key={route.path}
                  //   element={
                  //     <AuthorizedRoute
                  //       roles={route.roles}
                  //       permissions={route.permissions}
                  //     />
                  //   }
                  // >
                  //   {' '}
                  //   <Route path={route.path} element={route.element} />{' '}
                  // </Route>
                  <></>
                );
              }
              return <Route key={route.path} path={route.path} element={route.element} />;
            })}
          </Route>
        </Route>
        {systemRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
