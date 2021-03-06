<template>
  <section class="module-page page">
    <div class="module">
      <div class="module-title" v-if="!loading">
        <div class="previous" @click="previous">
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
        <h3>{{ courseModule.title || "" }}</h3>
        <div class="next" v-if="hasNext" @click="next">
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
        </div>
      </div>
      <div class="module-content">
        <div class="video" v-html="courseModule.video_embed_code"></div>
        <div class="details" v-if="!loading">
          <h3 class="title">{{ courseModule.title || "" }}</h3>
          <div class="note" v-html="courseModule.note"></div>
          <div class="download">
            <button
              type="button"
              @click="$router.push('/courses/' + course.id + '/chats/')"
              class="bg-blue text-white"
              v-if="course.is_user_enrolled"
            >
              Discussion
            </button>

            <button
              @click="downloadPDF"
              class="pdf"
              type="button"
              v-if="courseModule.pdf_file"
            >
              Dowload PDF
            </button>
          </div>
        </div>
      </div>
      <LoadSpinner :loading="loading" />
    </div>
  </section>
</template>

<script>
import LoadSpinner from "../components/LoadSpinner.vue";

export default {
  name: "Module",
  components: { LoadSpinner },

  data() {
    return { loading: false };
  },

  computed: {
    course() {
      return this.$store.state.course.course || { title: "" };
    },
    modules() {
      return this.course.modules || [];
    },
    sortModules() {
      if (!this.modules.length) return [];
      return this.modules.map(mod => mod.id);
    },
    courseModule() {
      if (!this.course) return { title: "", video_url: "" };
      return (
        this.$store.state.course.courseModule || { title: "", video_url: "" }
      );
    },
    hasNext() {
      const position = this.sortModules.indexOf(this.courseModule.id) + 1;
      if (position >= this.modules.length) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    previous() {
      const position = this.sortModules.indexOf(this.courseModule.id) + 1;
      if (position <= 1) {
        this.$router.push("/courses/" + this.course.id);
      } else {
        this.$router.push(
          "/courses/" +
            this.course.id +
            "/modules/" +
            this.sortModules[position - 2]
        );
      }
    },
    next() {
      const position = this.sortModules.indexOf(this.courseModule.id) + 1;
      if (position >= this.modules.length) {
        //
      } else {
        this.$router.push(
          "/courses/" +
            this.course.id +
            "/modules/" +
            this.sortModules[position]
        );
      }
    },
    downloadPDF() {
      window.location.href = this.courseModule.pdf_file;
    }
  },

  async beforeRouteUpdate(to, from, next) {
    const courseId = to.params.courseId;
    const moduleId = to.params.moduleId;
    await this.$store.dispatch("course/getModule", {
      courseId,
      moduleId
    });
    next();
  },

  async mounted() {
    const courseId = this.$route.params.courseId;
    const moduleId = this.$route.params.moduleId;
    this.loading = true;
    await this.$store.dispatch("course/getModule", {
      courseId,
      moduleId
    });
    this.loading = false;

    if (this.course.is_user_enrolled) {
      this.$store.commit("setSidebarComponents", ["course-chats"]);
    } else {
      this.$store.commit("setSidebarComponents", ["chats"]);
    }
  }
};
</script>
