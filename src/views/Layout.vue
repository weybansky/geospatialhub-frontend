<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/courses">Courses</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link> |
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
    </div>
    <Alert />
    <router-view />
  </div>
</template>

<script>
import Alert from "../components/Alert";

export default {
  name: "Layout",
  components: {
    Alert
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";
#nav {
  background-color: $primary-color;
}
</style>
