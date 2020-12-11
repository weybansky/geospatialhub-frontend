<template>
  <aside class="aside-right">
    <div
      class="chats-component"
      v-if="isActive('chats')"
      :style="{ order: order('chats') }"
    >
      <h3 class="title">Chats</h3>
      <div class="chats">
        <Chat
          v-for="(chat, index) in chats"
          :chat="modifyChat(chat)"
          :key="index"
        />
      </div>
      <router-link to="/chats" class="footer"> See all chats... </router-link>
      <load-spinner :loading="loadingChats" />
    </div>

    <div
      class="users-component"
      v-if="isActive('users')"
      :style="{ order: order('users') }"
    >
      <h3 class="title">People</h3>
      <div class="users">
        <UserCard
          class="user"
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
      <router-link to="/users" class="footer"> See all people... </router-link>
      <load-spinner :loading="loadingUsers" />
    </div>

    <div
      class="courses-component"
      v-if="isActive('courses')"
      :style="{ order: order('courses') }"
    >
      <h3 class="title">Courses</h3>
      <div class="courses">
        <div v-for="course in courses" :key="course.id">
          <!-- {{ course }} -->
        </div>
      </div>
      <router-link to="/courses" class="footer">
        See all Courses...
      </router-link>
      <load-spinner :loading="loadingCourses" />
    </div>

    <div
      class="ads-component"
      v-if="isActive('ads')"
      :style="{ order: order('ads') }"
    >
      <h3 class="title">ADS</h3>
      <div class="ads"></div>
      <load-spinner :loading="loadingAds" />
    </div>
  </aside>
</template>

<script>
import Chat from "../components/Chat";
import UserCard from "../components/UserCard";
import LoadSpinner from "./LoadSpinner.vue";

export default {
  name: "AsideRight",

  components: { UserCard, Chat, LoadSpinner },

  data() {
    return {
      loadingChats: false,
      loadingUsers: false,
      loadingCourses: false,
      loadingAds: false
    };
  },

  computed: {
    layoutOrder() {
      return this.$store.state.layout.components;
    },
    user() {
      return this.$store.state.auth.user || { profile: {} };
    },
    chats() {
      return this.$store.getters["auth/sortChats"];
    },
    users() {
      return this.$store.state.layout.user.users.slice(0, 10) || [];
    },
    courses() {
      return (
        this.$store.state.course.courses
          .filter(course => !course.is_user_enrolled)
          .slice(1, 10) || []
      );
    },
    ads() {
      return [];
    }
  },

  methods: {
    isActive(component) {
      return this.layoutOrder.includes(component);
    },
    order(component) {
      return this.layoutOrder.indexOf(component) + 1;
    },
    modifyChat(chat) {
      let chatClone = Object.assign({}, chat);
      chatClone.text = chat.text.slice(0, 50) + "...";
      return chatClone;
    }
  },

  async mounted() {
    if (this.isActive("users")) {
      this.loadingUsers = true;
      await this.$store.dispatch("getLayoutUsers");
      this.loadingUsers = false;
    }
    if (this.isActive("chats")) {
      this.loadingChats = true;
      await this.$store.dispatch("auth/getChats");
      this.loadingChats = false;
    }
    if (this.isActive("courses")) {
      this.loadingCourses = true;
      await this.$store.dispatch("getLayoutCourses");
      this.loadingCourses = false;
    }
    // if (this.isActive("ads")) {
    //   this.loadingAds = true;
    //   await this.$store.dispatch("getLayoutAds");
    //   this.loadingAds = false;
    // }
  }
};
</script>
