import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../views/Home';
import Detail from '../views/Detail';
import Profile from '../views/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/detail/:eventId', 
    element: <Detail />
  },
  {
    path: '/my-profile', 
    element: <Profile />
  }
])

const Routes = () => <RouterProvider router={router} />

export default Routes