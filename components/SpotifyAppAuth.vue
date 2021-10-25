<template>
  <span>{{ waitTime }} </span>
</template>

<script>
import config from "../ext_config/spotify.config";
//ToDo move to authorize.vue route middleware
export default {
  data() {
    return {
      authorization_code: null,
      spotify_access_token: null,
      oauth_redirect_url: null,
      waitTime: 0,
      clientCookie: "",
      config,
    };
  },
  created() {
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
            this.$config.baseURL +
            this.config.authorization.redirectEndpoint
        ),
      })
        .then((response) => {
          this.spotify_access_token = response.data;
          console.log(response.data);
          //set access_token as client-cookie
          this.clientCookie =
            "spotify_access_token=" +
            response.data.access_token +
            ";max-age=" +
            response.data.expires_in;
          console.log(this.clientCookie);
          //make post to /access_token with access_token and refresh token
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    console.log("mounted begin");
    console.log(!this.authorization_code);
    if (!this.authorization_code && !this.clientCookie) {
      this.oauth_redirect_url =
        this.config.authorization.baseUrl +
        this.config.authorization.endpoint +
        "?" +
        new URLSearchParams({
          client_id: this.config.clientId,
          response_type: "code",
          redirect_uri:
            this.$config.baseURL + this.config.authorization.redirectEndpoint,
          //ToDo: state: CSRF Token
          scopes: "playlist-modify-public",
        });
      window.location.assign(this.oauth_redirect_url);
    } else {
      //this.$emit("access-token", this.spotify_access_token);
      console.log("set cookie");
      console.log(this.clientCookie);
      if (this.clientCookie) {
        console.log(this.clientCookie);
        document.cookie = this.clientCookie;
      }
    }
  },
};
</script>