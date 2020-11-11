<template>
  <section class="courses-page">
    <div class="page-title">
      <h1 class="title">Courses</h1>

      <p class="feature">
        <font-awesome-icon
          :icon="['fas', 'check']"
          class="icon text-blue"
        ></font-awesome-icon>
        <span class="text">Free 14-day trial</span>
      </p>
      <p class="feature">
        <font-awesome-icon
          :icon="['fas', 'check']"
          class="icon text-blue"
        ></font-awesome-icon>
        <span class="text">First 2 videos free for all courses</span>
      </p>
      <p class="feature">
        <font-awesome-icon
          :icon="['fas', 'check']"
          class="icon text-blue"
        ></font-awesome-icon>
        <span class="text">14-day money-back guarantee</span>
      </p>
    </div>

    <ul class="categories">
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

    <div class="courses" v-if="courses.length">
      <div
        class="course"
        v-for="course in courses"
        :key="course.id"
        @click="$router.push({ path: 'courses/' + course.id })"
      >
        <div class="banner">
          <img class="image" :src="course.course_pic || 'course_image.png'" />
        </div>
        <div class="details">
          <h4 class="course-title">{{ course.title }}</h4>
          <p class="course-info">{{ course.module_count }} module(s)</p>
          <!-- <p class="rating">-----------</p> -->
        </div>
      </div>
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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck);

export default {
  name: "Courses",

  data() {
    return {
      courses: []
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
    if (this.$store.state.course.courses.length < 1) {
      await this.$store.dispatch("course/getCourses");
    }
    this.courses = this.$store.state.course.courses.slice();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/courses-page";
</style>
