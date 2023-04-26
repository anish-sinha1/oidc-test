import { useEffect, useState } from "react";
import { User, UserManager, UserManagerSettings } from "oidc-client-ts";

export class AuthService {
	private manager: UserManager;
	constructor(
		private settings: UserManagerSettings = {
			authority: "https://idp.sonarmentalhealth.com/realms/sonar_staging",
			client_id: "sonar_client",
			redirect_uri: "http://localhost:5173/callback",
			post_logout_redirect_uri: "http://localhost:5173",
		}
	) {
		this.manager = new UserManager(this.settings);
	}

	async getUser(): Promise<User | null> {
		return await this.manager.getUser();
	}

	async login(): Promise<void> {
		return await this.manager.signinRedirect();
	}

	async loginCallback(): Promise<User> {
		return await this.manager.signinRedirectCallback();
	}

	async logout(): Promise<void> {
		return await this.manager.signoutRedirect();
	}

	async sso(): Promise<User | null> {
		return await this.manager.signinSilent();
	}

	getToken() {
		return this.manager.getUser();
	}

	async removeUser(): Promise<void> {
		return await this.manager.removeUser();
	}
}

export const useAuth = () => {
	const [token, setToken] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(undefined);
	const [user, setUser] = useState<any>(null);

	const auth = new AuthService();

	const getToken = async () => {
		const user = await auth.getUser();
		return user?.access_token || "";
	};

	const getUser = async () => {
		const user = await auth.getUser();
		console.log(user);
		return user;
	};

	useEffect(() => {
		getUser().then((value) => setUser(value));
		getToken()
			.then((token) => {
				setToken(token);
				setLoading(false);
				console.log();
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return {
		user,
		token,
		loading,
		error,
		setUser,
	};
};
