<template>
  <div class="profile-page page">
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
            @click="$router.push('/profile/edit')"
            type="button"
            class="bg-blue text-white"
          >
            Edit Profile
          </button>

          <button
            @click="showMobileMenu = !showMobileMenu"
            type="button"
            class="mobile-menu"
          >
            <svg
              class="icon"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75ZM30 51.7969C17.9648 51.7969 8.20312 42.0352 8.20312 30C8.20312 17.9648 17.9648 8.20312 30 8.20312C42.0352 8.20312 51.7969 17.9648 51.7969 30C51.7969 42.0352 42.0352 51.7969 30 51.7969Z"
                fill="currentColor"
              />
              <path
                d="M27.1875 19.6875C27.1875 20.4334 27.4838 21.1488 28.0113 21.6762C28.5387 22.2037 29.2541 22.5 30 22.5C30.7459 22.5 31.4613 22.2037 31.9887 21.6762C32.5162 21.1488 32.8125 20.4334 32.8125 19.6875C32.8125 18.9416 32.5162 18.2262 31.9887 17.6988C31.4613 17.1713 30.7459 16.875 30 16.875C29.2541 16.875 28.5387 17.1713 28.0113 17.6988C27.4838 18.2262 27.1875 18.9416 27.1875 19.6875ZM31.4062 26.25H28.5938C28.3359 26.25 28.125 26.4609 28.125 26.7188V42.6562C28.125 42.9141 28.3359 43.125 28.5938 43.125H31.4062C31.6641 43.125 31.875 42.9141 31.875 42.6562V26.7188C31.875 26.4609 31.6641 26.25 31.4062 26.25Z"
                fill="currentColor"
              />
            </svg>
            <ul class="menu" v-if="showMobileMenu">
              <li class="item bg-red text-white" @click="logout">Logout</li>
            </ul>
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
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      showContactInfo: false,
      showMobileMenu: false
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
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
        this.$store.state.auth.posts.slice(0, 9).map(post => {
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

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },

  async mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    if (this.$store.state.auth.posts.length < 1) {
      await this.$store.dispatch("auth/getUserPosts");
    }
    this.$store.dispatch("auth/getUser");
  }
};
</script>
