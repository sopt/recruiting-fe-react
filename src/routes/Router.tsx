import { createBrowserRouter } from 'react-router-dom';

import Question from '@/pages/Question/Question';
import Layout from '@/layout/Layout';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: ROUTES_CONFIG.question.path, element: <Question /> }],
  },
]);
