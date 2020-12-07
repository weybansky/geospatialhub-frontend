<template>
  <div class="profile-page">
    <header :style="{ 'background-image': bannerImage }">
      <main>
        <div class="image">
          <img :src="profileImage" alt="" />
        </div>
        <div class="title">
          <h3>{{ fullName }}</h3>
          <p>
            <small>@{{ user.username }}</small>
          </p>
          <p>{{ profession }}</p>
        </div>
        <div class="actions">
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
      </main>
    </header>

    <section class="stats">
      <router-link :to="'/users/' + user.id + '/posts'" class="stat">
        <p class="stat-value text-blue">{{ postsCount }}</p>
        <p class="stat-title">Posts</p>
      </router-link>
      <router-link :to="'/users/' + user.id + '/followers'" class="stat">
        <p class="stat-value text-blue">{{ followersCount }}</p>
        <p class="stat-title">Followers</p>
      </router-link>
      <router-link :to="'/users/' + user.id + '/following'" class="stat">
        <p class="stat-value text-blue">{{ followingCount }}</p>
        <p class="stat-title">Following</p>
      </router-link>
    </section>

    <section class="info">
      <div class="bio">
        <p class="title">Works at</p>
        <p class="content">{{ work }}</p>
      </div>
      <div class="bio">
        <p class="title">Studied at</p>
        <p class="content">{{ study }}</p>
      </div>
      <!-- <div class="bio"> -->
      <!-- <p class="title">Martital Status</p> -->
      <!-- <p class="content">Divorced</p> -->
      <!-- </div> -->
      <div class="bio">
        <p class="title">See</p>
        <p
          class="content text-blue"
          @click="showContactInfo = !showContactInfo"
          style="cursor:pointer;"
        >
          Conatct info
        </p>
      </div>
    </section>

    <section class="info contact" v-if="showContactInfo">
      <div class="bio">
        <p class="title">Email</p>
        <p class="content">{{ user.email }}</p>
      </div>
      <div class="bio">
        <p class="title">Phone</p>
        <p class="content">{{ phone }}</p>
      </div>
    </section>

    <section class="about">
      <h3>About</h3>
      <div class="bio" v-html="about"></div>
    </section>

    <section class="activities-section">
      <h3>Activities</h3>
      <div class="activities">
        <div
          class="activity"
          v-for="post in posts"
          :key="post.id"
          @click="$router.push('/posts/' + post.id)"
          :style="{ 'background-image': post.background }"
        >
          <div class="text" v-html="post.text.slice(0, 100)"></div>
        </div>
      </div>
    </section>

    <LoadSpinner :loading="loading" />
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";

export default {
  name: "Profile",

  components: {
    LoadSpinner
  },

  data() {
    return {
      showContactInfo: false,
      userPosts: [],
      loading: false,
      loadingPosts: false,
      isFollowing: false
    };
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },
    profileImage() {
      return this.user.profile.profile_pic || "/user.png";
    },
    bannerImage() {
      const image = this.user.profile.banner_pic || null;
      return `url(${image})`;
    },
    fullName() {
      const firstname = this.user.profile.first_name || this.user.username;
      const lastname = this.user.profile.last_name || "";
      return firstname + " " + lastname;
    },
    profession() {
      return this.user.profile.occupation || "";
    },
    //
    postsCount() {
      return this.user.profile.post_count || 0;
    },
    followersCount() {
      return this.user.profile.follower_count || 0;
    },
    followingCount() {
      return this.user.profile.following_count || 0;
    },
    //
    work() {
      return this.user.profile.organization || "Work?";
    },
    study() {
      return this.user.profile.institution || "Institution?";
    },
    //
    phone() {
      return this.user.profile.phone || "- -";
    },
    about() {
      return this.user.profile.bio || "Write something about yourself ...";
    },
    posts() {
      return (
        this.userPosts.slice(0, 9).map(post => {
          if (post.image) {
            post.background = `url(${post.image})`;
          } else {
            post.background = null;
          }
          return post;
        }) || []
      );
    }
  },

  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    if (this.$store.state.auth.user.id == userId) {
      next("/profile");
    } else {
      this.laodProfile(userId);
      next();
    }
  },

  methods: {
    async laodProfile(userId) {
      this.loading = true;
      await this.$store
        .dispatch("user/getUser", userId)
        .then(({ data }) => {
          if (data.profile.follow_status == "Following") {
            this.isFollowing = true;
          }
          if (data.profile.follow_status == "Follow") {
            this.isFollowing = false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
      // Posts
      this.loadingPosts = true;
      await this.$store
        .dispatch("user/getUserPosts", { userId })
        .then(({ data }) => {
          this.userPosts = data.results;
        })
        .finally(() => {
          this.loadingPosts = false;
        });
    },

    followUser() {
      this.$store
        .dispatch("auth/followUser", { userId: this.user.id })
        .then(({ data }) => {
          this.laodProfile(this.user.id);
          if (data.status == "Followed") {
            this.isFollowing = true;
          } else {
            this.isFollowing = false;
          }
        });
    }
  },

  mounted() {
    const userId = this.$route.params.userId;
    if (this.$store.state.auth.user.id == userId) {
      this.$router.push("/profile");
    } else {
      this.laodProfile(userId);
    }
  }
};
</script>
