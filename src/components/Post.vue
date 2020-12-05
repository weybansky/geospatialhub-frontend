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
      <div class="comment">
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
      <div class="share">
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
      </div>
    </div>

    <LoadSpinner :loading="loading" />
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
      loading: false
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
    }
  },

  methods: {
    likePost() {
      this.$store.dispatch("post/likePost", this.post.id).then(() => {
        this.liked = !this.liked;
      });
    },

    // userLiked() {},

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
      this.$router.push("/posts/" + this.post.id);
    }
  },

  mounted() {
    // this.userLiked;
  }
};
</script>
