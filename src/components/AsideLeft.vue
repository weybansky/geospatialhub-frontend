<template>
  <aside class="aside-left">
    <router-link tag="div" to="/" class="branding">
      <a>
        <img class="logo" src="../assets/logo.png" alt="Logo" />
      </a>
    </router-link>

    <router-link to="/profile" tag="a" style="display:bloack;" class="user">
      <div class="image">
        <img :src="profileImage" alt="Profile Image" />
      </div>
      <h3 class="user-name">
        {{ fullName }}
      </h3>
      <p class="user-title">@{{ username }}</p>
    </router-link>

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
      return this.$store.state.auth.user.profile.profile_pic || "/user.png";
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
