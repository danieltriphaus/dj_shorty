import axios from "axios";

export default class Authenticator {
  constructor({ cookies, baseURL, cookieString, document }) {
    this.cookies = cookies;
    this.baseURL = baseURL;
    this.cookieString = cookieString;
    this._authenticated = false;
  }

  isAuthenticated() {
    return this._isCookieValueSet("spotify_access_token")
      ? true
      : this._authenticated;
  }

  getAccessToken() {
    return this._isCookieValueSet("spotify_access_token")
      ? this.cookies.get("spotify_access_token")
      : this._accessToken;
  }

  //ToDo: Write a Module that translates an Object into a Cookie String
  async attemptAccessTokenCookieRefresh() {
    let accessTokenResponse = await axios.get(
      this.baseURL + "api/access_token",
      {
        headers: {
          Cookie: this.cookieString
        }
      }
    );

    if (accessTokenResponse.status === 200) {
      this._setAccessTokenCookie(accessTokenResponse);
    }
  }

  _setAccessTokenCookie(accessToken) {
    this.cookies.set("spotify_access_token", accessToken.data.access_token, {
      maxAge: accessToken.data.expires_in
    });
    this._authenticated = true;
    this._accessToken = accessToken.data.access_token;
  }

  _isCookieValueSet(name) {
    return Boolean(this.cookies.get(name) && this.cookies.get(name).length > 0);
  }
}
