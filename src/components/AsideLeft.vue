<template>
  <aside class="aside-left">
    <div class="branding">
      <img class="logo" src="../assets/logo.png" alt="Logo" />
    </div>

    <div class="user">
      <img class="image" :src="profileImage" alt="Profile Image" />
      <h3 class="user-name">
        {{ fullName }}
      </h3>
      <p class="user-title">@{{ username }}</p>
    </div>

    <navigation></navigation>
  </aside>
</template>

<script>
import navigation from "../components/Navigation";

export default {
  name: "AsideLeft",

  components: {
    navigation
  },

  computed: {
    profileImage() {
      return this.$store.state.auth.user.profile.profile_pic || "user.png";
    },
    user() {
      return this.$store.state.auth.user;
    },
    username() {
      return this.$store.state.auth.user.username;
    },
    fullName() {
      return this.$store.getters["auth/fullname"];
    }
  }
};
</script>
