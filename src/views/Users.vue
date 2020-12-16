<template>
  <div class="home-page user-follow-page page">
    <Search />

    <div class="users" v-if="users.length">
      <UserCard
        class="user"
        v-for="user in users"
        :key="user.id"
        :user="user"
      />
      <LoadSpinner :loading="loadingUsers" />
    </div>
    <div class="users" v-if="users.length">
      <LoadMore
        v-if="showLoadMore"
        style="margin: auto"
        :isNext="true"
        text="Load More.."
        :loading="loadingMoreUsers"
        @loadMore="loadMore"
      />
    </div>

    <div class="users" v-else>
      <div class="user">
        <div class="details"><p class="text-center">No User found</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import LoadSpinner from "../components/LoadSpinner";
import UserCard from "../components/UserCard.vue";
import LoadMore from "../components/LoadMore.vue";

export default {
  name: "SearchPage",

  components: {
    Search,
    LoadSpinner,
    UserCard,
    LoadMore
  },

  data() {
    return {
      loadingUsers: false,
      loadingMoreUsers: false
    };
  },

  computed: {
    users() {
      return this.$store.state.user.users || [];
    },
    showLoadMore() {
      return this.users.length < this.$store.state.user.usersConfig.count;
    }
  },

  methods: {
    loadMore(data) {
      this.loadingMoreUsers = true;
      this.$store.dispatch("user/loadMoreUsers", data).finally(() => {
        this.loadingMoreUsers = false;
      });
    }
  },

  async mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    this.loadingUsers = true;
    await this.$store.dispatch("user/getUsers").finally(() => {
      this.loadingUsers = false;
    });
  }
};
</script>
