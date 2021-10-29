import config from "../ext_config/spotify.config";

export default async ({ app, $config, query, redirect, res }) => {
  if (query.code) {
    try {
      const spotifyAccessTokenResponse = await spotifyAccessTokenRequest(
        query.code,
        $config.baseURL
      );
      const spotifyAccessTokens = await spotifyAccessTokenResponse.json();
      if (!spotifyAccessTokenResponse.ok) {
        throw new Error(
          "Failed Spotify Response:" + JSON.stringify(spotifyAccessTokens)
        );
      } else {
        //post to /access_token
        const saveSpotifyTokensResponse = await saveSpotifyTokensInDb(
          $config.baseURL
        );

        //data = await response.json();
        /*
        app.$cookies.set("spotify_access_token", spotifyAccessTokens.access_token, {
          maxAge: spotifyAccessTokens.expires_in,

        });
        */
        //set cookie
        res.setHeader("Set-Cookie", [
          "spotify_access_token=" +
            spotifyAccessTokens.access_token +
            "; max-age=" +
            spotifyAccessTokens.expires_in +
            "; Secure; HttpOnly",

          "spotify_refresh_token=" +
            spotifyAccessTokens.refresh_token +
            "; max-age=" +
            10 * 365 * 24 * 60 * 60 +
            "; Secure; HttpOnly"
        ]);
      }
    } catch (error) {
      //ToDo: implement logging
      console.log(error);
    }
  } else {
    const oauth_redirect_url =
      config.authorization.baseUrl +
      config.authorization.endpoint +
      "?" +
      new URLSearchParams({
        client_id: config.clientId,
        response_type: "code",
        redirect_uri: $config.baseURL + config.authorization.redirectEndpoint,
        //ToDo: state: CSRF Token
        scopes: "playlist-modify-public"
      });

    redirect(oauth_redirect_url);
  }
};

function spotifyAccessTokenRequest(code, baseURL) {
  return fetch(
    config.authorization.baseUrl + config.authorization.tokenEndpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(config.clientId + ":" + config.clientSecret).toString(
            "base64"
          )
      },
      body: encodeURI(
        "grant_type=" +
          config.authorization.grantType +
          "&code=" +
          code +
          "&redirect_uri=" +
          baseURL +
          config.authorization.redirectEndpoint
      )
    }
  );
}

function saveSpotifyTokensInDb(baseURL) {
  //return fetch({});
}
