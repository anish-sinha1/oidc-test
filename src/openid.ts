import { useEffect, useState } from "react";
import { User, UserManager, UserManagerSettings } from "oidc-client-ts";

export class AuthService {
  private manager: UserManager;
  constructor(
    private settings: UserManagerSettings = {
      authority: "https://idp.sonarmentalhealth.com/realms/sonar_staging",
      client_id: "sonar_client",
      redirect_uri: "http://localhost:3000/callback",
      post_logout_redirect_uri: "http://localhost:3000/login",
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
}
