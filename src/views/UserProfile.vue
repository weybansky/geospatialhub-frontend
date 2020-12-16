<template>
  <div class="profile-page page">
    <header :style="{ 'background-image': bannerImage }">
      <label
        for="banner_image"
        class="edit-image"
        @click="preview('banner_image')"
        v-if="user.profile.banner_pic"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="camera"
          class="icon"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
          ></path>
        </svg>
      </label>
      <main>
        <div class="image" @click="preview('profile_image')">
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

          <button
            @click="$router.push('/chats/' + user.id)"
            type="button"
            class="chat bg-white text-blue"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="envelope"
              class="icon"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
              ></path>
            </svg>
          </button>
        </div>
      </main>
    </header>

    <div class="show-image" v-if="showImage">
      <div class="card">
        <div class="header">
          <p class="title">{{ previewImage.title }}</p>
        </div>
        <div class="body">
          <img :src="previewImage.image" :alt="previewImage.title" />
        </div>
        <div class="footer">
          <button
            type="button"
            class="bg-white text-blue"
            @click="showImage = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

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
      <div class="bio" v-if="work !== '...'">
        <p class="title">Works at</p>
        <p class="content">{{ work }}</p>
      </div>
      <div class="bio" v-if="study !== '...'">
        <p class="title">Studied at</p>
        <p class="content">{{ study }}</p>
      </div>
      <div class="bio" v-if="organization !== '...'">
        <p class="title">Organization</p>
        <p class="content">{{ organization }}</p>
      </div>
      <div class="bio" v-if="location !== '...'">
        <p class="title">Location</p>
        <p class="content">{{ location }}</p>
      </div>
      <div class="bio">
        <p class="title">See</p>
        <p
          class="content text-blue"
          @click="showContactInfo = !showContactInfo"
          style="cursor:pointer;"
        >
          Contact info
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
      <div class="activities" v-if="posts.length">
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
      <div class="activities" v-else>
        <div class="activity"><div class="text">No posts yet</div></div>
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
      isFollowing: false,
      showImage: false,
      previewImage: {
        title: "Profile Image",
        image: null
      }
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
      return this.user.profile.organization || "...";
    },
    study() {
      return this.user.profile.institution || "...";
    },
    organization() {
      return this.user.profile.organization || "...";
    },
    location() {
      let city = this.user.profile.location_city || "";
      if (city) city = `${city}, `;
      let state = this.user.profile.location_state || "";
      if (state) state = `${state}, `;
      const country = this.user.profile.location_country || "";
      const location = `${city}${state}${country}`;
      if (!location) return "...";
      return location;
    },
    //
    phone() {
      return this.user.profile.phone || "- -";
    },
    about() {
      // return this.user.profile.bio || "Write something about yourself ...";
      return this.user.profile.bio || ".....";
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
    },
    preview(type) {
      this.showImage = true;

      if (type == "profile_image") {
        this.previewImage.title = "Profile Image";
        this.previewImage.image = this.profileImage;
      } else {
        this.previewImage.title = "Banner Image";
        this.previewImage.image = this.user.profile.banner_pic || null;
      }
    }
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    const userId = this.$route.params.userId;
    if (this.$store.state.auth.user.id == userId) {
      this.$router.push("/profile");
    } else {
      this.laodProfile(userId);
    }
  }
};
</script>
