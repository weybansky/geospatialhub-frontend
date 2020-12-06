<template>
  <div class="user-follow-page">
    <div class="users" v-if="followers.length">
      <UserFollow
        v-for="follow in followers"
        :key="follow.id"
        :follow="follow"
        page="followers"
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
  name: "UserFollowers",

  components: {
    LoadSpinner,
    UserFollow
  },

  data() {
    return {
      followers: [],
      loading: false
    };
  },

  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    this.getFollowers(userId);
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
    async getFollowers(userId) {
      this.loading = true;
      await this.$store
        .dispatch("user/getFollowers", { userId })
        .then(({ data }) => {
          this.followers = data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    const userId = this.$route.params.userId;
    this.getFollowers(userId);
  }
};
</script>
