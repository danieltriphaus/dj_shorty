<template>
  <div v-bind:class="this.$route.name">
    <form name="start_spotify_session" v-on:submit.prevent="submit">
      <!-- <SpotifyAppAuth /> -->
      <SessionStartButton />
      <div class="spotify_redirect_warning">
        Sie werden zu Spotify weitergeleitet um sich einzuloggen
      </div>
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
  data() {
    return {
      waitTime: 0,
    };
  },
  methods: {
    submit() {
      this.$router.push({
        name: "authorize",
        params: { waitTime: this.waitTime },
      });
    },
  },
};
</script>
