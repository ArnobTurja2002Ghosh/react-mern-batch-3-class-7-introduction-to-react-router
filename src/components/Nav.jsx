import { Link } from "react-router";

const Nav = () => {
	return (
		<nav className="bg-slate-300">
			<ul className="font-medium flex p-4 md:p-0 flex-row md:space-x-8 rtl:space-x-reverse">
				<li className="block py-2 mx-10 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:px-28">
					<Link to="/">Home</Link>
				</li>
				{/* <li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/notes">Notes</Link>
				</li> */}
				<li className="block py-2 mx-10 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:px-28">
					<Link to="/favorites">Favorites</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
