<template>
  <div class="layout">
    <aside-left></aside-left>

    <main class="main">
      <router-view />
    </main>

    <aside class="aside-right"></aside>

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/courses">Courses</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link> |
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
    </div>
    <Alert />
    -->
  </div>
</template>

<script>
// import alert from "../components/Alert";
import AsideLeft from "../components/AsideLeft";
// import AsideRight from "../components/AsideRigth";

export default {
  name: "Layout",
  components: {
    // alert,
    "aside-left": AsideLeft
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
@import "../scss/layout";
</style>
