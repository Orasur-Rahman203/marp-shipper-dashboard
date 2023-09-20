import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import UserProfile from './pages/userAccount';
import LoginPage from './pages/LoginPage';
import ActiveOrder from './pages/ActiveOrder';
import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import Delivered from './pages/Delivered';
import OrderListPage from './_mock/orderList';
import DashboardAppPage from './pages/DashboardAppPage';
// import AddProduct from './pages/AddProduct';
// import ProductReview from './pages/ProductReview';
// import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {


  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard', 
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <OrderListPage /> },
        { path: 'profile', element: <UserProfile />, },
        // { path: 'orderList', element: <DashboardAppPage /> },
        // { path: 'pending', element: <Pending /> },
        // { path: 'activeOrder', element: <ActiveOrder /> },
        // { path: 'delivered', element: <Delivered /> },
       ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
