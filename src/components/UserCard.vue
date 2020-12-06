<template>
  <div class="user-follow">
    <div class="image" @click="$router.push('/users/' + user.id)">
      <img :src="user.profile.profile_pic || '/user.png'" alt="Profile Image" />
    </div>
    <div class="details" @click="$router.push('/users/' + user.id)">
      <p class="name">{{ fullName }}</p>
      <p class="username">@{{ user.username }}</p>
    </div>
    <div class="action">
      <button
        :disabled="isAuthenticatedUser"
        @click="followUser"
        type="button"
        :class="{
          'bg-blue text-white': isFollowing,
          'bg-white text-blue': !isFollowing
        }"
      >
        {{ isFollowing ? "Following" : "Follow" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",

  data() {
    return { isFollowing: true };
  },

  props: {
    user: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: null,
          username: "",
          profile: {
            first_name: "",
            last_name: "",
            profile_pic: null,
            follower_count: 0,
            following_count: 0,
            follow_status: "Follow"
          }
        };
      }
    }
  },

  computed: {
    fullName() {
      const fullName =
        (
          this.user.profile.first_name +
          " " +
          this.user.profile.last_name
        ).trim() || this.user.username;
      return fullName;
    },
    isAuthenticatedUser() {
      const userId = this.user.id;
      const authUserId = this.$store.state.auth.user.id;
      return userId == authUserId;
    }
  },

  methods: {
    followUser() {
      this.$store
        .dispatch("auth/followUser", { userId: this.user.id })
        .then(({ data }) => {
          if (data.status == "Followed") {
            this.isFollowing = true;
          } else {
            this.isFollowing = false;
          }
        });
    }
  },

  mounted() {
    if (this.user.profile.follow_status == "Following") {
      this.isFollowing = true;
    }
    if (this.user.profile.follow_status == "Follow") {
      this.isFollowing = false;
    }
  }
};
</script>
