<template>
  <div v-bind:class="this.$route.name">
    <form name="start_spotify_session" v-on:submit.prevent="submit">
      <!-- <SpotifyAppAuth /> -->
      <NuxtLink to="/authorize" v-if="!$config.authenticated">
        Einloggen bei Spotify
      </NuxtLink>
      <div class="spotify_redirect_warning">
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
export default {
  middleware: ["authenticate"],
  data() {
    return {
      waitTime: 0,
    };
  },
  methods: {
    submit() {
      this.$axios
        .post("https://bu7be.sse.codesandbox.io/api/music_session", {
          waitTime: this.waitTime,
          //SpotifyUserId
        })
        .catch((error) => {});
    },
  },
  //mounted: check if user has access_token in cookie if yes, show host view with generated guest link
  //if not, make get to /access_token for new access_token
  //if get /access_token says refresh token is invalid, end music session and show initial view
};
</script>
