import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"

export const Navbar = () => {

	const {store, actions} = useContext(Context)
	const {token} = store

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				{/* condition ? exprIfTrue : exprIfFalse */}

				{token == null ? (
					<div className="ml-auto">
						<Link to="/signup" className="m-1">
							<button className="btn btn-primary">Sign up</button>
						</Link>
						<Link to="/login" className="m-1">
							<button className="btn btn-primary">Login</button>
						</Link>
					</div>

				) : (
					<Link to="/" className="m-1">
						<button onClick={() => { actions.logout() }} className="btn btn-primary">Logout</button>
					</Link>

				)}




			</div>
		</nav>
	);
};
