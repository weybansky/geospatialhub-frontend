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
    </div>

    <!-- <div
      class="courses-component"
      v-if="isActive('courses')"
      :style="{ order: order('courses') }"
    >
      <h3 class="title">Courses</h3>
      <div class="courses">
        <div v-for="course in courses" :key="course.id">
        </div>
      </div>
      <router-link to="/courses" class="footer">
        See all Courses...
      </router-link>
    </div> -->

    <div
      class="ads-component"
      v-if="isActive('ads')"
      :style="{ order: order('ads') }"
    >
      <h3 class="title">Place your Ads here</h3>
      <div class="ads"></div>
    </div>

    <div
      class="chats-component course-chats-component"
      v-if="isActive('course-chats')"
      :style="{ order: order('course-chats') }"
    >
      <h3 class="title">Course Discussion</h3>
      <div class="chats">
        <CourseChat
          v-for="(chat, index) in courseChats"
          :chat="chat"
          :key="index"
        />
      </div>
      <form @submit.prevent="sendChat" class="post-chat">
        <LoadSpinner :loading="loadingForm" />
        <input type="text" v-model="courseChatText" />
        <button
          :disabled="loadingForm"
          type="submit"
          class="bg-blue text-white"
        >
          POST
        </button>
      </form>
    </div>
  </aside>
</template>

<script>
import Chat from "../components/Chat";
import UserCard from "../components/UserCard";
import CourseChat from "./CourseChat.vue";
import LoadSpinner from "./LoadSpinner.vue";

export default {
  name: "AsideRight",

  components: { UserCard, Chat, LoadSpinner, CourseChat },

  data() {
    return {
      loadingChats: false,
      loadingUsers: false,
      loadingCourses: false,
      loadingAds: false,
      courseChatText: "",
      loadingForm: false
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
    },
    courseChats() {
      const chats = this.$store.getters["course/sortChats"];
      const length = this.$store.getters["course/sortChats"].length;
      return chats.slice(length - 7, length);
    },
    coursesChatsCourseId() {
      return this.$route.params.courseId || null;
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
    },
    async sendChat() {
      this.loadingForm = true;
      await this.$store
        .dispatch("course/postCourseChat", {
          courseId: this.coursesChatsCourseId,
          text: this.courseChatText
        })
        .then(() => {
          this.courseChatText = "";
        })
        .finally(() => {
          this.loadingForm = false;
        });
    },
    async runComponents(courseId) {
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
      if (this.isActive("ads")) {
        // this.loadingAds = true;
        // await this.$store.dispatch("getLayoutAds");
        // this.loadingAds = false;
      }
      if (this.isActive("course-chats")) {
        this.loadingChats = true;
        await this.$store.dispatch("course/getCourseChats", courseId);
        this.loadingChats = false;
      }
    }
  },

  watch: {
    layoutOrder() {
      const courseId = this.$route.params.courseId;
      this.runComponents(courseId);
    }
  },

  beforeRouteUpdate(to, from, next) {
    const courseId = to.params.courseId;
    this.runComponents(courseId);
    next();
  },

  mounted() {
    const courseId = this.$route.params.courseId;
    this.runComponents(courseId);
  }
};
</script>
