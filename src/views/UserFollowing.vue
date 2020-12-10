<template>
  <div class="user-follow-page page">
    <div class="users" v-if="following.length">
      <UserFollow
        v-for="follow in following"
        :key="follow.id"
        :follow="follow"
        page="following"
      />
    </div>
    <LoadSpinner :loading="loading" />
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";
import UserFollow from "@/components/UserFollow";

// import moment from "moment";

export default {
  name: "UserFollowing",

  components: {
    LoadSpinner,
    UserFollow
  },

  data() {
    return {
      following: [],
      loading: false
    };
  },

  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    this.getFollowing(userId);
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
    async getFollowing(userId) {
      this.loading = true;
      await this.$store
        .dispatch("user/getFollowing", { userId })
        .then(({ data }) => {
          this.following = data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    const userId = this.$route.params.userId;
    this.getFollowing(userId);
  }
};
</script>
