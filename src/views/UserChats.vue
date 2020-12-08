<template>
  <div class="chats-page page">
    <div class="page-title">
      <h1 class="title">Chats</h1>
    </div>

    <div class="chats">
      <Chat v-for="(chat, index) in chats" :chat="chat" :key="index" />
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
export default {
  name: "UserChats",

  components: {
    Chat
  },

  data() {
    return {
      loading: false,
      getChatsTimer: null
    };
  },

  computed: {
    chats() {
      return this.$store.getters["auth/sortChats"];
    },
    user() {
      return this.$store.state.auth.user || { profile: {} };
    }
  },

  async beforeRouteLeave(to, from, next) {
    await clearInterval(this.getChatTimer);
    next();
  },

  mounted() {
    this.loadChats();
    this.getChatsTimer = setInterval(() => {
      this.$store.dispatch("auth/getChats");
    }, 10000);
  },

  methods: {
    async loadChats() {
      this.$store.dispatch("auth/getChats");
    }
  }
};
</script>
