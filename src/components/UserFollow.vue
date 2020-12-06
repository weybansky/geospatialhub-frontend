<template>
  <div class="user-follow">
    <div class="image" @click="$router.push('/users/' + user.id)">
      <img :src="user.image" alt="Profile Image" />
    </div>
    <div class="details" @click="$router.push('/users/' + user.id)">
      <p class="name">{{ user.name }}</p>
      <p class="username">@{{ user.username }}</p>
    </div>
    <div class="action">
      <button
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
  name: "UserFollow",

  data() {
    return { isFollowing: true };
  },

  props: {
    follow: {
      type: Object,
      required: true,
      default: () => {
        return {
          user: {},
          is_followed_by: {},
          created: null
        };
      }
    }
  },

  computed: {
    user() {
      let user = {
        id: this.follow.user.id,
        username: this.follow.user.username,
        first_name: this.follow.user.first_name || "",
        last_name: this.follow.user.last_name || "",
        image: this.follow.user.profile_pic || "/user.png"
      };
      user.name =
        (user.first_name + " " + user.last_name).trim() || user.username;
      return user;
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
    this.isFollowing =
      this.follow.is_followed_by.id == this.$store.state.auth.user.id;
  }
};
</script>
