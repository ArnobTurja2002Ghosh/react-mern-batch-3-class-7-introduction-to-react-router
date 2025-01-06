import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import {Provider} from "react-redux";
import {store} from "./store";
import { rootRouter } from "./router/router.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("ourRoot")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={rootRouter} />
		</Provider>
	</StrictMode>
);

// React Dom -> Main Dom /HTML             -> React App

// App()
// <App />
