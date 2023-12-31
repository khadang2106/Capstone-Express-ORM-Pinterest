import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import NoAuthGuard from '../guards/NoAuthGuard';
import Create from '../pages/Create/Create';

export default function Router() {
  const routing = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/create',
          element: <Create />,
        },
        {
          path: '/login',
          element: (
            <NoAuthGuard>
              <Login />
            </NoAuthGuard>
          ),
        },
        {
          path: '/signup',
          element: (
            <NoAuthGuard>
              <Signup />
            </NoAuthGuard>
          ),
        },
      ],
    },
  ]);

  return routing;
}
