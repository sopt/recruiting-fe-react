import Question from '@/pages/Question/Question';

import Layout from '@/layout/Layout';
import Application from '@/pages/Application/Application';
import PostGeneration from '@/pages/PostGeneration/PostGeneration';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      { path: ROUTES_CONFIG.question.path, element: <Question /> },
      { path: ROUTES_CONFIG.postGeneration.path, element: <PostGeneration /> },
      { path: ROUTES_CONFIG.application.path, element: <Application /> },
    ],
  },
]);
