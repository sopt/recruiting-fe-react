import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout/Layout";
import PostGeneration from "@/pages/PostGeneration/PostGeneration";
import PostQuestion from "@/pages/PostQuestion/PostQuestion";
import { ROUTES_CONFIG } from "@/routes/routeConfig";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: ROUTES_CONFIG.postQuestion.path, element: <PostQuestion /> },
			{ path: ROUTES_CONFIG.postGeneration.path, element: <PostGeneration /> },
		],
	},
]);
