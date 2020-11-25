<template>
  <div class="layout">
    <aside-left></aside-left>

    <main class="main">
      <router-view />
    </main>

    <aside class="aside-right"></aside>

    <!-- 
    <Alert />
    -->
  </div>
</template>

<script>
// import alert from "../components/Alert";
import AsideLeft from "../components/AsideLeft";

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
