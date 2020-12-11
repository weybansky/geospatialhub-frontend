<template>
  <section class="courses-page page">
    <div class="page-title">
      <h1 class="title">
        Courses <router-link to="courses">My Courses</router-link>
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

    <ul class="categories">
      <!-- <li class="category" @click="$router.push('mycourses')">
        Enrolled
      </li> -->
      <li
        class="category"
        :class="{ active: !$route.query.category }"
        @click="filterCourseByCategory(null)"
      >
        All
      </li>

      <li
        v-for="category in categories"
        :key="category.id"
        class="category"
        :class="{ active: $route.query.category == category.id }"
        @click="filterCourseByCategory(category.id)"
      >
        {{ category.title }}
      </li>
    </ul>

    <LoadSpinner :loading="loading" />

    <div class="courses" v-if="courses.length">
      <Course v-for="course in courses" :key="course.id" :course="course" />
    </div>
    <div class="courses" v-else>
      <div class="course">
        <div class="details">
          <h4 class="course-title">No Course Found</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Course from "../components/Course.vue";
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "AllCourses",

  components: { Course, LoadSpinner },

  data() {
    return {
      courses: [],
      loading: false
    };
  },

  watch: {
    "$route.query.category": function(category) {
      if (category) {
        this.courses = this.allCourses.filter(course => {
          return course.category.id == category;
        });
      } else {
        this.courses = this.allCourses;
      }
    }
  },

  computed: {
    allCourses() {
      return this.$store.state.course.courses;
    },

    categories() {
      return this.$store.state.course.categories;
    }
  },

  methods: {
    filterCourseByCategory(value) {
      const queryCategory = this.$route.query.category;
      if (queryCategory != value) {
        return this.$router.push({
          path: "/courses",
          query: { category: value }
        });
      }
    }
  },

  async mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    this.loading = true;
    if (this.$store.state.course.categories.length < 1) {
      await this.$store.dispatch("course/getCategories");
    }
    if (this.$store.state.course.courses.length < 1) {
      await this.$store.dispatch("course/getCourses");
    }
    this.loading = false;
    this.courses = this.$store.state.course.courses.slice();
  }
};
</script>
