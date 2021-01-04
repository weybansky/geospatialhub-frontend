<template>
  <div class="post">
    <div class="header">
      <div class="author-image" @click="$router.push('/users/' + user.id)">
        <img :src="user.image || '/user.png'" alt="Profile Image" />
      </div>
      <div class="author-details">
        <p class="name">
          {{ user.name }}
          <small class="datetime">{{ postedAt }}</small>
        </p>
        <p class="username">@{{ user.username }}</p>
      </div>
      <div class="author-actions">
        <svg
          class="icon"
          @click="showActions = !showActions"
          width="42"
          height="25"
          viewBox="0 0 42 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.0625 0.52099L0.375 4.22933L21 24.8335L41.625 4.20849L37.9375 0.52099L21 17.4585L4.0625 0.52099Z"
            fill="currentColor"
          />
        </svg>

        <ul class="actions" v-if="showActions">
          <li
            class="action bg-red text-white"
            v-if="postBelongsToUser"
            @click="deletePost"
          >
            Delete
          </li>
        </ul>
      </div>
    </div>

    <div class="body" @click="viewPost">
      <p class="text" v-html="post.text"></p>
      <img v-if="post.image" :src="post.image" alt="Post Image" />
    </div>

    <div class="footer">
      <div class="like" @click="likePost" :class="{ liked: liked }">
        <svg
          class="icon"
          width="71"
          height="62"
          viewBox="0 0 71 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.53674e-05 31.1138C9.53674e-05 26.8492 3.7401 24.6153 8.8001 24.6153L23.5401 24.6153C22.4401 20.9599 22.0001 17.5076 22.0001 14.4615C22.0001 2.68302 25.5201 0.246094 28.6001 0.246094C30.5801 0.246094 32.1201 0.449171 34.1001 1.46456C34.7601 1.87071 34.9801 2.27686 35.2001 2.88609L37.4001 13.8522C39.8201 19.5384 45.7601 24.6153 50.6001 28.0676L50.6001 57.1076C48.8401 57.1076 47.0801 57.92 44.8801 58.9353C42.4601 59.9507 40.0401 61.1692 37.4001 61.1692L16.5001 61.1692C12.1001 61.1692 8.8001 57.9199 8.8001 55.0769C8.8001 54.4676 8.80009 54.0615 9.02009 53.6553C6.38009 52.6399 4.4001 50.6092 4.4001 47.9692C4.4001 46.7507 4.62009 45.7353 5.0601 44.7199C3.30009 43.7046 1.76009 41.8769 1.76009 39.8461C1.76009 38.6276 2.4201 37.4092 3.0801 36.3938C1.3201 35.1753 9.53674e-05 33.1446 9.53674e-05 31.1138ZM4.62009 31.1138C4.62009 33.7538 7.48009 33.9569 7.92009 35.1753C8.36009 36.5969 6.1601 37.003 6.1601 39.4399C6.1601 41.8769 9.4601 41.8769 9.9001 43.2984C10.3401 44.923 8.8001 45.3292 8.8001 47.7661V48.1723C9.2401 50.203 12.5401 50.4061 13.2001 51.2184C13.8601 52.2338 13.2001 52.64 13.2001 54.8738C13.2001 56.0923 14.7401 56.9046 16.5001 56.9046L37.4001 56.9046C39.1601 56.9046 40.9201 56.0923 43.1201 55.0769C44.8801 54.2646 46.6401 53.4523 48.4001 53.0461L48.4001 31.723C42.9001 27.8646 35.8601 22.1784 33.2201 15.0707L33.2201 14.6646L31.2401 4.51071C30.3601 4.30763 29.7001 4.30763 28.6001 4.30763C28.1601 4.30763 26.4001 6.74456 26.4001 14.4615C26.4001 17.5076 27.0601 20.7569 28.1601 24.6153H28.6001C29.9201 24.6153 30.8001 25.4276 30.8001 26.6461C30.8001 27.8646 29.9201 28.6769 28.6001 28.6769L8.8001 28.6769C6.6001 28.6769 4.62009 29.6923 4.62009 31.1138Z"
            fill="currentColor"
          />
          <path
            d="M52.7999 61.1691L65.9999 61.1691C68.4199 61.1691 70.3999 59.3414 70.3999 57.1075L70.3999 28.6768C70.3999 26.4429 68.4199 24.6152 65.9999 24.6152L52.7999 24.6152C50.3799 24.6152 48.3999 26.4429 48.3999 28.6768L48.3999 57.1075C48.3999 59.3414 50.3799 61.1691 52.7999 61.1691ZM65.9999 28.6768L65.9999 57.1075L52.7999 57.1075L52.7999 28.6768L65.9999 28.6768Z"
            fill="currentColor"
          />
        </svg>
        <span v-html="likesCount">Like</span>
      </div>
      <div
        class="comment"
        @click="$router.push('/posts/' + post.id + '?autofocus=true')"
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
            d="M53.3332 0.833496H6.66658C3.4495 0.833496 0.833252 3.44975 0.833252 6.66683V59.1668L16.3878 47.5002H53.3332C56.5503 47.5002 59.1666 44.8839 59.1666 41.6668V6.66683C59.1666 3.44975 56.5503 0.833496 53.3332 0.833496ZM53.3332 41.6668H14.4453L6.66658 47.5002V6.66683H53.3332V41.6668Z"
            fill="currentColor"
          />
        </svg>
        <span v-html="commentsCount"></span>
      </div>
      <div class="share" @click="sharePost">
        <svg
          class="icon"
          width="58"
          height="70"
          viewBox="0 0 58 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.33325 35V61.6667C2.33325 63.4348 3.03563 65.1305 4.28587 66.3807C5.53612 67.631 7.23181 68.3333 8.99992 68.3333H48.9999C50.768 68.3333 52.4637 67.631 53.714 66.3807C54.9642 65.1305 55.6666 63.4348 55.6666 61.6667V35"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M42.3332 14.9998L28.9998 1.6665L15.6665 14.9998"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M29 1.6665V44.9998"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="social" v-if="showShareButtons" @click="sharePost">
          <a
            network="facebook"
            title="copy to clipboard"
            @click="clipboard"
            ref="clipboard"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="link"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
              ></path>
            </svg>
          </a>
          <ShareNetwork
            network="facebook"
            :url="social.url"
            :title="social.title"
            :description="social.description"
            :hashtags="social.hashtags"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-f"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              ></path>
            </svg>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="social.url"
            :title="social.title"
            :description="social.description"
            :hashtags="social.hashtags"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
              ></path>
            </svg>
          </ShareNetwork>
          <ShareNetwork
            network="whatsapp"
            :url="social.url"
            :title="social.title"
            :description="social.description"
            :hashtags="social.hashtags"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="whatsapp"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
              ></path>
            </svg>
          </ShareNetwork>
          <ShareNetwork
            network="linkedin"
            :url="social.url"
            :title="social.title"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="linkedin-in"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
              ></path>
            </svg>
          </ShareNetwork>
        </div>
      </div>
    </div>

    <LoadSpinner :loading="loading" />

    <div class="preview-image" v-if="previewImage">
      <img :src="post.image" alt="Post Image" />
      <div class="close" @click="previewImage = false">
        <span>&times;</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LoadSpinner from "@/components/LoadSpinner";

export default {
  name: "Post",

  components: {
    LoadSpinner
  },

  data() {
    return {
      liked: false,
      showActions: false,
      loading: false,
      showShareButtons: false,
      previewImage: false
    };
  },

  props: {
    post: {
      type: Object,
      required: true,
      default: () => {
        return {
          // id: null,
          // post_belongs_to_authenticated_user: false,
          // posted_by: {
          //   id: "4",username: "weybansky", profile_pic: null, first_name: "", last_name: ""
          // },
          // pub_date: "2020-11-08T10:34:00.270289Z",
          // text: "",
          // image: null,
          // in_reply_to_post: null,
          // likes_count: 0,
          // comments_count: 0
        };
      }
    },
    isComment: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    postBelongsToUser() {
      return this.post.post_belongs_to_authenticated_user;
    },

    user() {
      let user = {
        id: this.post.posted_by.id,
        username: this.post.posted_by.username,
        first_name: this.post.posted_by.first_name || "",
        last_name: this.post.posted_by.last_name || "",
        image: this.post.posted_by.profile_pic || null
      };
      user.name =
        (user.first_name + " " + user.last_name).trim() || user.username;
      return user;
    },

    postedAt() {
      return moment(this.post.pub_date).fromNow();
    },

    commentsCount() {
      if (this.post.comments_count < 1) {
        return "Comment";
      }
      return `${this.post.comments_count} comments`;
    },

    likesCount() {
      if (this.post.likes_count < 1) {
        return "Like";
      }
      if (this.post.likes_count == 1) {
        return `${this.post.likes_count} like`;
      }
      return `${this.post.likes_count} likes`;
    },

    social() {
      return {
        title: `Check this post by ${this.user.name} on The Geospatial Hub`,
        url: window.location.origin + "/posts/" + this.post.id,
        description: "",
        hashtags: "geospatial, geospatialhub"
      };
    }
  },

  methods: {
    likePost() {
      this.$store
        .dispatch("post/likePost", {
          postId: this.post.id,
          isComment: this.isComment
        })
        .then(({ data }) => {
          // this.liked = !this.liked;
          this.liked = data.postWasLiked;
        });
    },

    sharePost() {
      this.showShareButtons = !this.showShareButtons;
      if (this.showShareButtons && navigator.share) {
        navigator.share({
          title: this.social.title,
          text: this.social.description,
          url: this.social.url
        });
        // .then(() => console.log("Successful share"))
        // .catch(error => console.log("Error sharing:", error));
      }
    },
    clipboard() {
      var dummy = document.createElement("input"),
        text = this.social.url;
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("copied");
    },

    deletePost() {
      this.loading = true;
      this.$store
        .dispatch("post/deletePost", {
          postId: this.post.id,
          isComment: this.isComment
        })
        .finally(() => {
          this.loading = false;
        });
    },

    viewPost() {
      const to = "/posts/" + this.post.id;
      if (this.$route.path == to) {
        // if on post page, preview post image
        if (this.post.image) {
          this.previewImage = true;
        }
      } else {
        this.$router.push(to);
      }
    }
  },

  mounted() {
    this.liked = this.post.authenticated_user_like_status;
  }
};
</script>
