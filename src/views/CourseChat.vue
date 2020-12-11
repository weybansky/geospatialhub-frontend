<template>
  <section class="courses-page course-page course-chat-page page">
    <div class="course">
      <h4 class="course-title">{{ course.title || "" }}</h4>
      <p>Discussion: Chat with other people taking the course</p>
    </div>

    <LoadSpinner :loading="loading" />

    <div class="chats" ref="chats">
      <Chat v-for="(chat, index) in chats" :key="index" :chat="chat" />
    </div>

    <form @submit.prevent="sendChat" class="post-chat">
      <LoadSpinner :loading="loadingForm" />
      <input type="text" v-model="text" />
      <button :disabled="loadingForm" type="submit" class="bg-blue text-white">
        POST
      </button>
    </form>
  </section>
</template>

<script>
import LoadSpinner from "../components/LoadSpinner.vue";
import Chat from "../components/CourseChat.vue";

export default {
  name: "CourseChat",
  components: { LoadSpinner, Chat },

  data() {
    return {
      loading: false,
      loadingForm: false,
      text: ""
    };
  },

  computed: {
    course() {
      return this.$store.state.course.course || {};
    },
    chats() {
      // return this.$store.state.course.chat.chats || [];
      if (this.loading) return [];
      return this.$store.getters["course/sortChats"];
    },
    author() {
      // TODO
      return this.course.author;
    },
    category() {
      return this.course.category;
    }
  },

  beforeRouteUpdate(to, from, next) {
    const courseId = to.params.courseId;
    this.$store.dispatch("course/getCourseChats", courseId);
    next();
  },

  methods: {
    async sendChat() {
      this.loadingForm = true;
      await this.$store
        .dispatch("course/postCourseChat", {
          courseId: this.course.id,
          text: this.text
        })
        .then(() => {
          this.text = "";
        })
        .finally(() => {
          this.loadingForm = false;
        });
    }
  },

  async created() {
    this.$store.commit("setSidebarComponents", ["course-chats"]);
    const courseId = this.$route.params.courseId;
    this.loading = true;
    if (!this.course) {
      await this.$store.dispatch("course/getCourse", courseId).then(() => {
        this.loading = false;
      });
    }
    await this.$store.dispatch("course/getCourseChats", courseId).then(() => {
      this.loading = false;
    });
  }
};
</script>
