<template>
  <div class="layout">
    <aside-left />

    <main class="main">
      <router-view />
    </main>

    <aside-right v-if="sidebarEnabled" />

    <!-- 
    <Alert />
    -->
  </div>
</template>

<script>
// import alert from "../components/Alert";
import AsideLeft from "../components/AsideLeft";
import AsideRight from "../components/AsideRight.vue";

export default {
  name: "Layout",
  components: {
    // alert,
    "aside-left": AsideLeft,
    "aside-right": AsideRight
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    sidebarEnabled() {
      return this.$store.state.layout.sidebarEnabled;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },

  mounted() {
    if (window.screen.width < 768) {
      this.$store.commit("disableSideBar");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/layout";
</style>
