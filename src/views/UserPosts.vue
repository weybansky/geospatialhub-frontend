<template>
  <div class="home-page">
    <!-- <Search /> -->
    <CreateNewPost v-if="isAuthenticatedUser" @postCreated="postCreated" />
    <div class="posts" v-if="posts.length">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="posts" v-else>
      <div class="post text-center">No Post Found</div>
    </div>
    <LoadSpinner :loading="loading" />
  </div>
</template>

<script>
import Post from "../components/Post";
import LoadSpinner from "@/components/LoadSpinner";
import CreateNewPost from "../components/CreateNewPost";

export default {
  name: "UserPosts",

  components: {
    Post,
    LoadSpinner,
    CreateNewPost
  },

  data() {
    return {
      posts: [],
      loading: false
    };
  },

  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    this.getPosts(userId);
    next();
  },

  computed: {
    isAuthenticatedUser() {
      const userId = this.$route.params.userId;
      const authUserId = this.$store.state.auth.user.id;
      return userId == authUserId;
    }
  },

  methods: {
    async getPosts(userId) {
      this.loading = true;
      await this.$store
        .dispatch("user/getUserPosts", { userId })
        .then(({ data }) => {
          this.posts = data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    postCreated(post) {
      this.posts.unshift(post);
    }
  },

  mounted() {
    const userId = this.$route.params.userId;
    this.getPosts(userId);
  }
};
</script>
