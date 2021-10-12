<template>
  <span />
</template>

<script>
export default {
  data() {
    return {
      authorization_code: null,
      spotify_access_token: null,
      oauth_redirect_url: null,
    };
  },
  fetch() {
    this.authorization_code = this.$route.query["code"];

    if (this.authorization_code) {
      this.$axios({
        method: "POST",
        url: "/api/token",
        baseURL: "https://accounts.spotify.com",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              "5d32c6be193a454aa17e5b420ed8501e:53d4f739e85644e78a0a9122bf45b151"
            ).toString("base64"),
        },
        data: encodeURI(
          "grant_type=authorization_code&code=" +
            this.authorization_code +
            "&redirect_uri=https://bu7be.sse.codesandbox.io/"
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
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          client_id: "5d32c6be193a454aa17e5b420ed8501e",
          response_type: "code",
          redirect_uri: "https://bu7be.sse.codesandbox.io/",
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