import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthCallback } from "./Callback.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/callback",
		element: <AuthCallback />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
