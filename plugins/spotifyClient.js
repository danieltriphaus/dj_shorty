import axios from "axios";
import SpotifyClient from "~/lib/SpotifyClient";

export default ({ req, res }, inject) => {
  axios.defaults.baseURL = "https://api.spotify.com/v1";

  const spotifyClient = new SpotifyClient();

  inject("spotifyClient", spotifyClient);
};
