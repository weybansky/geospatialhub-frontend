<template>
  <div class="chats-page page">
    <div class="page-title">
      <h1 class="title">Chats</h1>
    </div>

    <div class="chats" style="position:relative" v-if="chats.length">
      <Chat v-for="(chat, index) in chats" :chat="chat" :key="index" />
      <LoadSpinner :loading="loading" />
    </div>

    <div class="chats" v-if="chats.length">
      <LoadMore
        v-if="showLoadMore"
        :isNext="true"
        text="Load More.."
        :loading="loadingMoreChats"
        @loadMore="loadMore"
      />
    </div>

    <div class="chats" v-else>
      <div class="chat">
        <div class="details">
          <p class="username">No Chats Found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat.vue";
import LoadMore from "../components/LoadMore.vue";
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "UserChats",

  components: {
    Chat,
    LoadSpinner,
    LoadMore
  },

  data() {
    return {
      loading: false,
      getChatsTimer: null,
      loadingMoreChats: false
    };
  },

  computed: {
    chats() {
      return this.$store.getters["auth/sortChats"];
    },
    user() {
      return this.$store.state.auth.user || { profile: {} };
    },
    showLoadMore() {
      return this.chats.length < this.$store.state.auth.chatsConfig.count;
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
    },
    loadMore(data) {
      this.loadingMoreCourses = true;
      this.$store.dispatch("auth/loadMoreChats", data).finally(() => {
        this.loadingMoreCourses = false;
      });
    }
  }
};
</script>
