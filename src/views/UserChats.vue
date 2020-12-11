<template>
  <div class="chats-page page">
    <div class="page-title">
      <h1 class="title">Chats</h1>
    </div>

    <div class="chats" style="position:relative">
      <Chat v-for="(chat, index) in chats" :chat="chat" :key="index" />

      <LoadSpinner :loading="loading" />

      <div class="chat" v-if="!chats.length">
        <div class="details">
          <p class="username">No Chats Found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "UserChats",

  components: {
    Chat,
    LoadSpinner
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
    await clearInterval(this.getChatsTimer);
    next();
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    this.loading = true;
    this.loadChats().finally(() => {
      this.loading = false;
    });
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
