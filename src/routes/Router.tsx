import { createBrowserRouter } from "react-router-dom";

import PostQuestion from "@/pages/PostQuestion/PostQuestion";
import Layout from "@/layout/Layout";
import { ROUTES_CONFIG } from "@/routes/routeConfig";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: ROUTES_CONFIG.postQuestion.path, element: <PostQuestion /> },
    ],
  },
]);
