import { Link, Outlet } from "react-router";
import Nav from "../components/Nav";

export default function Root() {
	return (
		<div>
			<div id="sidebar" className="sticky top-1">
				<Nav />
			</div>
			<div id="detail">
				<Outlet />
			</div>
			{/* <footer>
				<ul>
					<li>Footer 1</li>
					<li>Footer 1</li>
					<li>Footer 1</li>
					<li>Footer 1</li>
				</ul>
			</footer> */}
		</div>
	);
}
