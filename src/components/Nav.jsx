import { Link } from "react-router";

const Nav = () => {
	return (
		<nav className="bg-slate-300">
			<ul className="font-medium flex p-4 md:p-0 flex-row rtl:space-x-reverse w-full">
				<li className="w-1/2 block py-2  text-center rounded md:bg-transparent md:text-blue-700">
					<Link to="/">Home</Link>
				</li>
				<li className="w-1/2 block py-2  text-center rounded md:bg-transparent md:text-blue-700 ">
					<Link to="/favorites">Favorites</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
