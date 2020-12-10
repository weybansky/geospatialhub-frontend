<template>
  <div class="home-page page">
    <Search />

    <CreateNewPost />

    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :post="post" />
      <LoadSpinner :loading="loading" />
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import CreateNewPost from "../components/CreateNewPost";
import Post from "../components/Post";
import LoadSpinner from "../components/LoadSpinner.vue";

export default {
  name: "Home",

  components: {
    CreateNewPost,
    Post,
    Search,
    LoadSpinner
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },

    posts() {
      return this.$store.state.post.posts;
    }
  },

  async mounted() {
    if (window.screen.width < 768) {
      this.$store.commit("disableSideBar");
    }
    this.$store.commit("setSidebarComponents", ["users", "chats"]);
    this.loading = true;
    await this.$store.dispatch("post/getPosts");
    this.loading = false;
  }
};
</script>
