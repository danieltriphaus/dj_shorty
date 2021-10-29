<template>
  <div v-bind:class="this.$route.name">
    <div class="spotify_user" v-if="this.authenticated">
      Eingeloggt als {{ this.spotifyUser.displayName }}
    </div>

    <form name="start_spotify_session" v-on:submit.prevent="startSession">
      <!-- <SpotifyAppAuth /> -->
      <NuxtLink to="/authorize" v-if="!this.authenticated">
        Einloggen bei Spotify
      </NuxtLink>
      <div class="spotify_redirect_warning" v-if="!this.authenticated">
        Sie werden zu Spotify weitergeleitet um sich einzuloggen
      </div>
      <SessionStartButton />
      <label for="wait_time">
        Wartezeit um Tracks hinzuzufügen
        <BaseInput
          name="wait_time"
          type="number"
          placeholder="Wartezeit"
          v-model="waitTime"
        />
      </label>
    </form>
  </div>
</template>

<script>
import Authenticator from "~/lib/Authenticator";

export default {
  data() {
    return {
      waitTime: 0,
      authenticated: false,
      spotifyAccessToken: undefined,
      spotifyUser: {
        displayName: "",
      },
    };
  },
  async asyncData({ app, $config, req, res }) {
    if (process.server) {
      let authenticator = new Authenticator({
        cookies: app.$cookies,
        baseURL: $config.baseURL,
        cookieString: req.headers.cookie,
      });

      if (!authenticator.isAuthenticated()) {
        await authenticator.attemptAccessTokenCookieRefresh();
      }

      return {
        authenticated: authenticator.isAuthenticated(),
        spotifyAccessToken: authenticator.getAccessToken(),
      };
    }
  },
  methods: {
    startSession() {
      this.$axios
        .post("/api/music_session", {
          waitTime: this.waitTime,
          //SpotifyUserId
        })
        .catch((error) => {});
    },
  },
  async mounted() {
    this.$spotifyClient.setAccessToken(this.spotifyAccessToken);

    try {
      const spotifyUserResponse = await this.$spotifyClient.getCurrentUser();
      if (spotifyUserResponse.status === 200) {
        this.spotifyUser.displayName = spotifyUserResponse.data.display_name;
      } else {
        this.authenticated = false;
        this.spotifyAccessToken = undefined;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
