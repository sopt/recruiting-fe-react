import Application from '@/assets/svg/Application';
import Layout from '@/layout/Layout';
import Login from '@/pages/Login/Login';
import PostGeneration from '@/pages/PostGeneration/PostGeneration';
import PostQuestion from '@/pages/PostQuestion/PostQuestion';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTES_CONFIG.login.path,
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: ROUTES_CONFIG.postQuestion.path, element: <PostQuestion /> },
      { path: ROUTES_CONFIG.postGeneration.path, element: <PostGeneration /> },
      { path: ROUTES_CONFIG.application.path, element: <Application /> },
    ],
  },
]);
