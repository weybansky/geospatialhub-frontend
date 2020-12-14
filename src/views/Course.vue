<template>
  <section class="courses-page course-page page">
    <div class="courses">
      <div class="course" v-if="!loading">
        <div class="banner">
          <img class="image" :src="course.course_pic || '/course_image.png'" />
        </div>
        <div class="details">
          <h4 class="course-title">{{ course.title }}</h4>
          <p class="course-info">
            <svg
              class="icon"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75ZM30 51.7969C17.9648 51.7969 8.20312 42.0352 8.20312 30C8.20312 17.9648 17.9648 8.20312 30 8.20312C42.0352 8.20312 51.7969 17.9648 51.7969 30C51.7969 42.0352 42.0352 51.7969 30 51.7969Z"
                fill="currentColor"
              />
              <path
                d="M27.1875 19.6875C27.1875 20.4334 27.4838 21.1488 28.0113 21.6762C28.5387 22.2037 29.2541 22.5 30 22.5C30.7459 22.5 31.4613 22.2037 31.9887 21.6762C32.5162 21.1488 32.8125 20.4334 32.8125 19.6875C32.8125 18.9416 32.5162 18.2262 31.9887 17.6988C31.4613 17.1713 30.7459 16.875 30 16.875C29.2541 16.875 28.5387 17.1713 28.0113 17.6988C27.4838 18.2262 27.1875 18.9416 27.1875 19.6875ZM31.4062 26.25H28.5938C28.3359 26.25 28.125 26.4609 28.125 26.7188V42.6562C28.125 42.9141 28.3359 43.125 28.5938 43.125H31.4062C31.6641 43.125 31.875 42.9141 31.875 42.6562V26.7188C31.875 26.4609 31.6641 26.25 31.4062 26.25Z"
                fill="currentColor"
              />
            </svg>
            <span>{{ course.module_count }} modules</span>
            <svg
              class="icon"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 3.75C15.5039 3.75 3.75 15.5039 3.75 30C3.75 44.4961 15.5039 56.25 30 56.25C44.4961 56.25 56.25 44.4961 56.25 30C56.25 15.5039 44.4961 3.75 30 3.75ZM30 51.7969C17.9648 51.7969 8.20312 42.0352 8.20312 30C8.20312 17.9648 17.9648 8.20312 30 8.20312C42.0352 8.20312 51.7969 17.9648 51.7969 30C51.7969 42.0352 42.0352 51.7969 30 51.7969Z"
                fill="currentColor"
              />
              <path
                d="M27.1875 19.6875C27.1875 20.4334 27.4838 21.1488 28.0113 21.6762C28.5387 22.2037 29.2541 22.5 30 22.5C30.7459 22.5 31.4613 22.2037 31.9887 21.6762C32.5162 21.1488 32.8125 20.4334 32.8125 19.6875C32.8125 18.9416 32.5162 18.2262 31.9887 17.6988C31.4613 17.1713 30.7459 16.875 30 16.875C29.2541 16.875 28.5387 17.1713 28.0113 17.6988C27.4838 18.2262 27.1875 18.9416 27.1875 19.6875ZM31.4062 26.25H28.5938C28.3359 26.25 28.125 26.4609 28.125 26.7188V42.6562C28.125 42.9141 28.3359 43.125 28.5938 43.125H31.4062C31.6641 43.125 31.875 42.9141 31.875 42.6562V26.7188C31.875 26.4609 31.6641 26.25 31.4062 26.25Z"
                fill="currentColor"
              />
            </svg>
            <span>{{ estimatedTime }} hours</span>
          </p>

          <div class="price" v-if="!enrolled">
            <span class="strikethrough"
              >${{ course.price_before_discount }}</span
            >
            <span>${{ course.price }}</span>
            <button type="button" class="bg-blue text-white" @click="payNow()">
              Buy Now
            </button>
            <p v-if="paymentError" class="text-red">
              Failed to initialize payment
            </p>
          </div>
          <div class="price" v-if="enrolled">
            <button
              type="button"
              @click="$router.push('/courses/' + course.id + '/chats/')"
              class="bg-blue text-white"
            >
              Discussion
            </button>
            <button type="button" @click="unenroll" class="bg-red text-white">
              Unenroll
            </button>
            <br />
            <p class="unenroll-message" v-if="unenrollMessage">
              {{ unenrollMessage }}
            </p>
            <small v-else>14-day money-back guarantee</small>
          </div>

          <p class="overview" v-html="course.overview"></p>
          <p class="author" v-if="course.author.first_name">
            Author:
            {{ course.author.first_name + " " + course.author.last_name }}
          </p>
        </div>
      </div>

      <LoadSpinner :loading="loading || loadingPayment" />

      <div class="modules" v-if="!loading">
        <div class="module" v-for="(mod, index) in modules" :key="mod.id">
          <div class="title">
            <span class="number">{{ twoDigits(++index) }}</span>
            {{ mod.title }}
          </div>
          <div class="details">
            <div class="description" v-html="mod.description"></div>
            <button
              type="button"
              class="bg-blue text-white"
              @click="goToModule(mod.id)"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "Course",
  components: { LoadSpinner },

  data() {
    return {
      loading: false,
      loadingPayment: false,
      paymentError: false,
      unenrollMessage: ""
    };
  },

  computed: {
    course() {
      return this.$store.state.course.course || null;
    },
    modules() {
      if (!this.course) return [];
      return this.course.modules;
    },
    author() {
      // TODO
      return this.course.author;
    },
    category() {
      return this.course.category;
    },
    enrolled() {
      return this.course.is_user_enrolled;
    },
    discounted() {
      return this.course.price_before_discount > this.course.price;
    },
    estimatedTime() {
      // TODO: Convert to hours and minutes
      return this.course.estimated_time;
    }
  },

  beforeRouteUpdate(to, from, next) {
    const courseId = to.params.courseId;
    this.$store.dispatch("course/getCourse", courseId);
    next();
  },

  methods: {
    twoDigits(value) {
      if (value < 10) return `0${value}`;
    },

    async payNow() {
      this.paymentError = false;
      const courseId = this.$route.params.courseId;
      this.loadingPayment = true;
      await this.$store
        .dispatch("course/payForCourse", courseId)
        .catch(() => {
          this.paymentError = true;
        })
        .finally(() => {
          this.loadingPayment = false;
        });
    },

    goToModule(moduleId) {
      const courseId = this.$route.params.courseId;
      return this.$router.push(`/courses/${courseId}/modules/${moduleId}`);
    },

    unenroll() {
      this.loading = true;
      this.$store
        .dispatch("course/unenroll", this.course.id)
        .then(({ data }) => {
          if (data.unenroll_status) {
            this.unenrollMessage = data.message || "You have been unenrolled";
            this.$store.dispatch("course/getCourse", this.course.id);
          } else {
            this.unenrollMessage = "You have been unenrolled";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },

  async beforeRouteLeave(to, from, next) {
    await clearTimeout(this.unenrollReload);
    next();
  },

  async created() {
    const courseId = this.$route.params.courseId;
    this.loading = true;
    await this.$store.dispatch("course/getCourse", courseId).then(() => {
      this.loading = false;
    });
    if (this.course.is_user_enrolled) {
      this.$store.commit("setSidebarComponents", ["course-chats"]);
    } else {
      this.$store.commit("setSidebarComponents", ["chats"]);
    }
  }
};
</script>
