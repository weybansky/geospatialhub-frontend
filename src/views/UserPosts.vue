<template>
  <div class="home-page">
    <!-- <Search /> -->
    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
// import Search from "../components/Search";
import Post from "../components/Post";

export default {
  name: "UserPosts",

  components: {
    Post
    // Search
  },

  data() {
    return {
      posts: [],
      loading: false
    };
  },

  methods: {
    async Posts() {
      this.loading = true;
      await this.$store
        .dispatch("user/getPosts")
        .then(({ data }) => {
          console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    this.getPosts();
  }
};
</script>
