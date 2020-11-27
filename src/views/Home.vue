<template>
  <div class="home-page">
    <Search />

    <CreateNewPost />

    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import CreateNewPost from "../components/CreateNewPost";
import Post from "../components/Post";

export default {
  name: "Home",

  components: {
    CreateNewPost,
    Post,
    Search
  },

  data() {
    return {};
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
    await this.$store.dispatch("post/getPosts");
  }
};
</script>
