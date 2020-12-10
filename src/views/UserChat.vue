<template>
  <div class="chat-page page">
    <header class="mobile-menu">
      <div class="back" @click="$router.back()">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrow-left"
          class="icon"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
          ></path>
        </svg>
      </div>
      <div class="user">
        <div class="image">
          <img
            :src="receiver.profile.profile_pic || '/user.png'"
            alt="Profile Image"
          />
        </div>
        <div class="details">
          <p class="name">
            {{ receiver.profile.first_name + " " + receiver.profile.last_name }}
          </p>
          <p class="username">@{{ receiver.username }}</p>
        </div>
      </div>
      <router-link to="/chats" tag="div" class="to-chat">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="envelope"
          class="icon"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
          ></path>
        </svg>
      </router-link>
    </header>

    <div class="messages" ref="messages">
      <Message
        v-for="(message, index) in messages"
        :message="message"
        :key="index"
      />
      <LoadSpinner :loading="loading" />
    </div>

    <div class="message-box">
      <form method="POST" @submit.prevent="sendMessage">
        <input
          type="text"
          v-model="text"
          placeholder="Type your message here..."
        />
        <button type="submit" :disabled="noInput">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            class="icon"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
          <span>SEND</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import LoadSpinner from "../components/LoadSpinner";
export default {
  name: "UserChat",

  components: {
    Message,
    LoadSpinner
  },

  data() {
    return {
      loading: false,
      text: "",
      getChatTimer: null
    };
  },

  computed: {
    messages() {
      if (this.loading) return [];
      return this.$store.getters["auth/sortMessages"];
      // return this.$store.state.auth.chat.messages;
    },
    sender() {
      if (this.loading)
        return {
          id: null,
          username: "",
          profile: { first_name: "", last_name: "" }
        };
      return (
        this.$store.state.auth.user || {
          id: null,
          username: "",
          profile: { first_name: "", last_name: "" }
        }
      );
    },
    receiver() {
      return (
        this.$store.state.auth.chat.receiver || {
          id: null,
          username: "",
          profile: { first_name: "", last_name: "" }
        }
      );
    },
    noInput() {
      return !this.text.length;
    }
  },

  async beforeRouteUpdate(to, from, next) {
    await clearInterval(this.getChatTimer);
    const userId = to.params.userId;
    if (this.$store.state.auth.user.id == userId) {
      next("/chats");
    } else {
      this.loadChat(userId);
      next();
    }
  },

  async beforeRouteLeave(to, from, next) {
    await clearInterval(this.getChatTimer);
    next();
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["users"]);
    const userId = this.$route.params.userId;
    this.loadChat(userId);
    this.getChatTimer = setInterval(() => {
      this.$store.dispatch("auth/getChat", { userId });
    }, 3500);
  },

  methods: {
    async loadChat(userId) {
      this.loading = true;
      await this.$store.dispatch("user/getUser", userId).then(({ data }) => {
        this.$store.commit("auth/setChatReceiver", data);
      });
      await this.$store.dispatch("auth/getChat", { userId });
      this.loading = false;
    },

    async sendMessage() {
      let message = {
        userId: this.receiver.id,
        text: this.text
      };
      if (!message.text.length || !message.userId) {
        return;
      }
      await this.$store.dispatch("auth/sendMessage", message).then(() => {
        this.text = "";
      });
    }
  }
};
</script>
