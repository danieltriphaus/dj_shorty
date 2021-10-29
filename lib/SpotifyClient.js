import axios from "axios";

export default class SpotifyClient {
  constructor() {
    axios.defaults.baseURL = "https://api.spotify.com/v1/";
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async getCurrentUser() {
    return await axios.get("/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.accessToken
      }
    });
  }
}
