<template>
  <div class="home-page search-page user-follow-page">
    <Search :placeholder="query" />

    <div class="tabs">
      <div
        class="tab"
        :class="{ active: tab == 'posts' }"
        @click="tab = 'posts'"
      >
        Posts
        <span class="badge">({{ posts.length }})</span>
      </div>
      <div
        class="tab"
        :class="{ active: tab == 'users' }"
        @click="tab = 'users'"
      >
        Users
        <span class="badge">({{ users.length }})</span>
      </div>
      <!-- TODO -->
      <!-- <div
        class="tab"
        :class="{ active: tab == 'courses' }"
        @click="tab = 'courses'"
      >
        Courses
        <span class="badge">({{ courses.length }})</span>
      </div> -->
    </div>

    <div class="posts" v-if="tab == 'posts'">
      <Post v-for="post in posts" :key="post.id" :post="post" />
      <LoadSpinner :loading="loadingPosts" />
      <div class="post" v-if="posts.length < 1">
        <div class="body">
          <p class="text" style="text-align:center">No Posts found</p>
        </div>
      </div>
    </div>

    <div class="users" v-if="tab == 'users'">
      <UserCard
        class="user"
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
      <LoadSpinner :loading="loadingUsers" />
      <div class="user" v-if="users.length < 1">
        <div class="details"><p class="text-center">No User found</p></div>
      </div>
    </div>

    <div class="courses" v-if="tab == 'courses'">
      <!--  -->
      <LoadSpinner :loading="loadingCourses" />
      <div class="course text-center" v-if="courses.length < 1">
        <p>No Course found</p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import Post from "../components/Post";
import LoadSpinner from "../components/LoadSpinner";
import UserCard from "../components/UserCard.vue";

export default {
  name: "SearchPage",

  components: {
    Post,
    Search,
    LoadSpinner,
    UserCard
  },

  data() {
    return {
      query: "",
      tab: "users",
      loadingPosts: false,
      loadingUsers: false,
      loadingCourses: false
    };
  },

  computed: {
    posts() {
      return this.$store.state.post.search.posts || [];
    },

    users() {
      return this.$store.state.user.search.users || [];
    },

    courses() {
      return this.$store.state.course.search.courses || [];
    }
  },

  methods: {
    async loadReults(query) {
      // Posts
      this.loadingPosts = true;
      await this.$store.dispatch("post/searchPosts", query).finally(() => {
        this.loadingPosts = false;
      });
      if (this.posts.length) {
        this.tab = "posts";
      }
      // Users
      this.loadingUsers = true;
      await this.$store.dispatch("user/searchUsers", query).finally(() => {
        this.loadingUsers = false;
      });
      if (this.posts.length < 1 && this.users.length) {
        this.tab = "users";
      }
      // TODO
      // Courses
      // this.loadingCourses = true;
      // await this.$store.dispatch("course/searchCourses", query).finally(() => {
      //   this.loadingCourses = false;
      // });
      // if (this.users.length < 1 && this.courses.length) {
      //   this.tab = "courses";
      // }
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.query = to.query.q || "";
    this.loadReults(this.query);
    next();
  },

  async mounted() {
    this.query = this.$route.query.q || "";
    this.loadReults(this.query);
  }
};
</script>
