import express from "express";
import axios from "axios";
import spotifyConfig from "../../ext_config/spotify.config";

const router = express.Router();

router.get("/access_token", async (req, res) => {
  const refresh_token = req.cookies.spotify_refresh_token;

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await axios({
      method: "POST",
      url:
        spotifyConfig.authorization.baseUrl +
        spotifyConfig.authorization.tokenEndpoint,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            spotifyConfig.clientId + ":" + spotifyConfig.clientSecret
          ).toString("base64")
      },
      data: encodeURI("grant_type=refresh_token&refresh_token=" + refresh_token)
    });

    res.json(response.data);
  } catch (err) {
    res.send(err.response.data);
  }
});

export default router;
