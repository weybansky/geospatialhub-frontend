<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h3>Home</h3>
    <button v-if="isAuthenticated" type="button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",

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
