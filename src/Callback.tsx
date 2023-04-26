import { useEffect } from "react";
import { AuthService, useAuth } from "./openid";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
	const auth = new AuthService();
	const navigate = useNavigate();

	useEffect(() => {
		auth.loginCallback().then(() => {
			navigate("/");
		});
	}, []);
	return <p>Hello!</p>;
};
