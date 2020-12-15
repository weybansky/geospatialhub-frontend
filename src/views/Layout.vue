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
    setInterval(() => {
      this.$store.dispatch("auth/getNotifications");
    }, 30000);
  }
};
</script>

<style lang="scss">
@import "../scss/layout";
</style>
