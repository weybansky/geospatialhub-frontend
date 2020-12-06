<template>
  <div class="home-page user-follow-page">
    <Search :placeholder="query" />

    <div class="users">
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
  </div>
</template>

<script>
import Search from "../components/Search";
import LoadSpinner from "../components/LoadSpinner";
import UserCard from "../components/UserCard.vue";

export default {
  name: "SearchPage",

  components: {
    Search,
    LoadSpinner,
    UserCard
  },

  data() {
    return {
      query: "",
      loadingUsers: false
    };
  },

  computed: {
    users() {
      return this.$store.state.user.search.users || [];
    }
  },

  methods: {
    async loadReults(query) {
      this.loadingUsers = true;
      await this.$store.dispatch("user/searchUsers", query).finally(() => {
        this.loadingUsers = false;
      });
    },

    // TODO
    loadMore() {}
  },

  async mounted() {
    this.loadReults(this.query);
  }
};
</script>
