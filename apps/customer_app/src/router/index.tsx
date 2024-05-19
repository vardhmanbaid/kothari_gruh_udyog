import { webRoutes } from '@core/routes';
import { PageNotFound } from '@core/ui/components/pageNotFound';
import { RootLayout } from '@core/ui/components/rootLayout';
import AdminHome from '@pages/admin';
import ErrorBoundary from '@pages/errorBoundary';
import Home from '@pages/home';
import ItemList from '@pages/itemList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRouter } from './privateRouter';
import Products from '@pages/product';
import Cart from '@pages/cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: webRoutes.itemList,
        element: <ItemList />,
      },
      {
        path: webRoutes.cart,
        element: <Cart />,
      },
    ],
  },
  {
    path: webRoutes.admin,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: webRoutes.editableProducts,
        element: (
          <PrivateRouter>
            <Products />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function RouterApp() {
  return <RouterProvider router={router} />;
}

export default RouterApp;
