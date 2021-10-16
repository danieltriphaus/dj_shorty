<template>
  <span>{{ waitTime }} </span>
</template>

<script>
import config from "../ext_config/spotify.config";

export default {
  data() {
    return {
      authorization_code: null,
      spotify_access_token: null,
      oauth_redirect_url: null,
      waitTime: 0,
      config,
    };
  },
  fetch() {
    this.waitTime = this.$route.params.waitTime;
    this.authorization_code = this.$route.query["code"];

    if (this.authorization_code) {
      this.$axios({
        method: "POST",
        url: this.config.authorization.tokenEndpoint,
        baseURL: this.config.authorization.baseUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              this.config.clientId + ":" + this.config.clientSecret
            ).toString("base64"),
        },
        data: encodeURI(
          "grant_type=" +
            this.config.authorization.grantType +
            "&code=" +
            this.authorization_code +
            "&redirect_uri=" +
            this.$config.baseURL
        ),
      })
        .then((response) => {
          this.spotify_access_token = response.data;
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    if (!this.authorization_code) {
      this.oauth_redirect_url =
        this.config.authorization.baseUrl +
        this.config.authorization.endpoint +
        "?" +
        new URLSearchParams({
          client_id: this.config.clientId,
          response_type: "code",
          redirect_uri: this.$config.baseURL,
          //ToDo: state: CSRF Token
          scopes: "playlist-modify-public",
        });
      window.location.assign(this.oauth_redirect_url);
    } else {
      this.$emit("access-token", this.spotify_access_token);
    }
  },
};
</script>