<template>
  <div class="home-page">
    <div class="posts">
      <Post :post="post" v-if="post" />
      <LoadSpinner :loading="loadingPost" v-else />
    </div>

    <CreateNewPost :isComment="true" :postId="post.id" v-if="post" />

    <div class="posts comments">
      <Post
        class="comment"
        v-for="comment in comments"
        :key="comment.id"
        :post="comment"
        :isComment="true"
      />
      <LoadSpinner :loading="loadingComments" />
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
import LoadSpinner from "@/components/LoadSpinner";
import CreateNewPost from "../components/CreateNewPost";

export default {
  name: "PostPage",

  components: {
    Post,
    LoadSpinner,
    CreateNewPost
  },

  data() {
    return {
      loadingPost: false,
      loadingComments: false
    };
  },

  computed: {
    post() {
      return this.$store.state.post.post || null;
    },

    comments() {
      return this.$store.state.post.comments || [];
    }
  },

  methods: {
    async loadPage(postId) {
      this.loadingPost = true;
      await this.$store.dispatch("post/getPost", postId).finally(() => {
        this.loadingPost = false;
      });
      this.loadingComments = true;
      await this.$store.dispatch("post/getPostComments", postId).finally(() => {
        this.loadingComments = false;
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    const postId = to.params.post;
    this.loadPage(postId);
    next();
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    const postId = this.$route.params.post;
    this.loadPage(postId);
  }
};
</script>
