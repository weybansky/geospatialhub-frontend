<template>
  <div class="home-page page">
    <Search />

    <CreateNewPost />

    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :post="post" />
      <LoadSpinner :loading="loading" />
      <LoadMore
        class="post"
        v-if="showLoadMore"
        text="More Posts.."
        :loading="loadingMorePosts"
        @loadMore="loadMorePosts"
      />
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import CreateNewPost from "../components/CreateNewPost";
import Post from "../components/Post";
import LoadSpinner from "../components/LoadSpinner.vue";
import LoadMore from "../components/LoadMore.vue";

export default {
  name: "Home",

  components: {
    CreateNewPost,
    Post,
    Search,
    LoadSpinner,
    LoadMore
  },

  data() {
    return {
      loading: false,
      loadingMorePosts: false
    };
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },

    posts() {
      return this.$store.state.post.posts;
    },

    showLoadMore() {
      return this.posts.length < this.$store.state.post.postsConfig.count;
    }
  },

  async mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    this.loading = true;
    await this.$store.dispatch("post/getPosts");
    this.loading = false;
  },

  methods: {
    loadMorePosts(data) {
      this.loadingMorePosts = true;
      this.$store.dispatch("post/loadMorePosts", data).finally(() => {
        this.loadingMorePosts = false;
      });
    }
  }
};
</script>
