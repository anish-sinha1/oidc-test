import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthService, useAuth } from "./openid";

function App() {
	const { user, token, loading, error, setUser } = useAuth();
	const auth = new AuthService();

	useEffect(() => {
		auth
			.sso()
			.then((value) => {
				console.log(value);
				setUser(value);
			})
			.catch((error) => {
				console.log(error);
				//auth.removeUser();
			});
	});

	return (
		<div>
			{loading ? (
				<p>Loading</p>
			) : user ? (
				<>
					<p>Token: {token}</p>
					<p>Error: {error ? error : "No error"}</p>
					<button onClick={() => auth.logout()}>Logout</button>
				</>
			) : (
				<>
					<button onClick={() => auth.login()}>Login</button>
				</>
			)}
		</div>
	);
}

export default App;
