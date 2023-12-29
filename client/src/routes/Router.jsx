import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';

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
      ],
    },
  ]);

  return routing;
}
