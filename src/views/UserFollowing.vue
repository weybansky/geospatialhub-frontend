<template>
  <div class="user-follow-page">
    <div class="users" v-if="following.length">
      <UserFollow
        v-for="follow in following"
        :key="follow.id"
        :follow="follow"
        :following="true"
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
    const userId = this.$route.params.userId;
    this.getFollowing(userId);
  }
};
</script>
