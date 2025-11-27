import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Application from '@/pages/Application/Application';
import ApplicationDetail from '@/pages/ApplicationDetail/ApplicationDetail';
import Login from '@/pages/Login/Login';
import PostGeneration from '@/pages/PostGeneration/PostGeneration';
import PreviewForm from '@/pages/PostQuestion/components/PreviewForm';
import PostQuestion from '@/pages/PostQuestion/PostQuestion';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const router = createBrowserRouter([
  {
    path: ROUTES_CONFIG.login.path,
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES_CONFIG.application.path} replace />,
      },
      { path: ROUTES_CONFIG.application.path, element: <Application /> },
      { path: ROUTES_CONFIG.postQuestion.path, element: <PostQuestion /> },
      { path: ROUTES_CONFIG.postGeneration.path, element: <PostGeneration /> },
      {
        path: ROUTES_CONFIG.applicationDetail.path,
        element: <ApplicationDetail />,
      },
      {
        path: ROUTES_CONFIG.previewForm.path,
        element: <PreviewForm />,
      },
    ],
  },
]);
