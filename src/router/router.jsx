import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Team from "../pages/Team";
import Favourites from "../pages/Favourites"

import App from "../App";
import Root from "../pages/Root";
import NotFound from "../pages/NotFound";
import Notes, { loader, action } from "../pages/Notes";
import Details from "../pages/Details";

// import "../index.css";

export const rootRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{ path: "/notes", element: <Home /> },
			{ path: "/about", element: <About /> },
			{ path: "/team", element: <Team /> },
			{
				path: "/",
				element: <Notes />,
				loader: loader,
				action: action,
			},
			{path:"/pokemon/:name", element: <Details/>},
			{path:"/favorites", element:<Favourites/>}
			// { path: "*", element: <NotFound /> },
		],
	},
]);
