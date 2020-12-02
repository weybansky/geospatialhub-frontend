<template>
  <section class="courses-page">
    <div class="page-title">
      <h1 class="title">
        Courses <router-link to="mycourses">My Courses</router-link>
      </h1>

      <p class="feature">
        <svg
          class="icon text-blue"
          width="64"
          height="60"
          viewBox="0 0 64 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.7343 3.08065C48.2973 10.3827 41.1593 17.3337 34.6243 26.4027C31.7423 30.4027 28.5373 35.1106 26.4423 39.5556C25.2463 41.9126 23.0903 45.5956 22.3553 49.1367C18.3353 45.3966 14.0173 41.1516 9.59926 37.8266C6.45026 35.4576 -2.61974 40.2877 1.07226 43.0657C7.68926 48.0427 13.1923 54.2416 19.6283 59.4407C22.3203 61.6127 28.2863 56.8956 29.6883 54.9166C34.2903 48.3966 34.9193 40.4266 38.2733 33.3146C43.3943 22.4376 52.4763 13.5027 61.4433 5.74365C67.3843 0.202651 61.2483 -0.81935 56.7433 3.08065"
            fill="currentColor"
          />
        </svg>
        <span class="text">Free 14-day trial</span>
      </p>
      <p class="feature">
        <svg
          class="icon text-blue"
          width="64"
          height="60"
          viewBox="0 0 64 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.7343 3.08065C48.2973 10.3827 41.1593 17.3337 34.6243 26.4027C31.7423 30.4027 28.5373 35.1106 26.4423 39.5556C25.2463 41.9126 23.0903 45.5956 22.3553 49.1367C18.3353 45.3966 14.0173 41.1516 9.59926 37.8266C6.45026 35.4576 -2.61974 40.2877 1.07226 43.0657C7.68926 48.0427 13.1923 54.2416 19.6283 59.4407C22.3203 61.6127 28.2863 56.8956 29.6883 54.9166C34.2903 48.3966 34.9193 40.4266 38.2733 33.3146C43.3943 22.4376 52.4763 13.5027 61.4433 5.74365C67.3843 0.202651 61.2483 -0.81935 56.7433 3.08065"
            fill="currentColor"
          />
        </svg>
        <span class="text">First 2 videos free for all courses</span>
      </p>
      <p class="feature">
        <svg
          class="icon text-blue"
          width="64"
          height="60"
          viewBox="0 0 64 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.7343 3.08065C48.2973 10.3827 41.1593 17.3337 34.6243 26.4027C31.7423 30.4027 28.5373 35.1106 26.4423 39.5556C25.2463 41.9126 23.0903 45.5956 22.3553 49.1367C18.3353 45.3966 14.0173 41.1516 9.59926 37.8266C6.45026 35.4576 -2.61974 40.2877 1.07226 43.0657C7.68926 48.0427 13.1923 54.2416 19.6283 59.4407C22.3203 61.6127 28.2863 56.8956 29.6883 54.9166C34.2903 48.3966 34.9193 40.4266 38.2733 33.3146C43.3943 22.4376 52.4763 13.5027 61.4433 5.74365C67.3843 0.202651 61.2483 -0.81935 56.7433 3.08065"
            fill="currentColor"
          />
        </svg>
        <span class="text">14-day money-back guarantee</span>
      </p>
    </div>

    <div class="courses" v-if="course">
      <div class="course">
        <div class="banner">
          <img class="image" :src="course.course_pic || '/course_image.png'" />
        </div>
        <div class="details">
          <h4 class="course-title">{{ course.title }}</h4>
          <p class="overview" v-html="course.overview.slice(1, 100)"></p>
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
            <small>{{ course.module_count }} module(s)</small>
          </p>
          <p class="course-info" v-if="course.author.first_name">
            Author:
            {{ course.author.first_name + " " + course.author.last_name }}
          </p>
        </div>
        <div class="price">₦{{ course.price }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Course",

  data() {
    return {};
  },

  computed: {
    course() {
      return this.$store.state.course.course;
    }
  },

  methods: {},

  async mounted() {
    await this.$store.dispatch("course/getCourse", this.$route.params.course);
    if (!this.course) {
      await this.$store.dispatch(
        "course/getCourseModules",
        this.$route.params.course
      );
      // fetch module
      // console.log("Failed");
    }
  }
};
</script>
