<template>
  <div class="home-page">
    <div class="posts">
      <Post :post="post" />
    </div>

    <div class="posts comments">
      <Post
        class="comment"
        v-for="comment in comments"
        :key="comment.id"
        :post="comment"
      />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";

export default {
  name: "PostPage",

  components: {
    Post
  },

  data() {
    return {};
  },

  computed: {
    post() {
      return this.$store.state.post.post;
      // return {};
    },

    comments() {
      return [];
      // return this.$store.state.post.post.comments;
    }
  },

  async mounted() {
    await this.$store.dispatch("post/getPosts");
    const postId = this.$route.params.post;
    await this.$store.dispatch("post/getPost", postId);
  }
};
</script>
