export default async ({ app, $config, req }) => {
  if (app.$cookies.get("spotify_access_token")) {
    $config.authenticated = true;
  } else if (app.$cookies.get("spotify_refresh_token")) {
    let accessTokenResponse = await fetch(
      $config.baseURL + "api/access_token",
      {
        headers: {
          Cookie: req.headers.cookie
        }
      }
    );

    let accessToken = await accessTokenResponse.json();

    app.$cookies.set("spotify_access_token", accessToken.access_token, {
      maxAge: accessToken.expires_in,
      //secure: true,
      httpOnly: true
    });
    $config.authenticated = true;
  }
};
