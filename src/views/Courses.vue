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
        :class="{ active: $route.query.category == 1 }"
        @click="filterCourseByCategory('1')"
      >
        Category 1
      </li>
      <li
        class="category"
        :class="{ active: $route.query.category == 2 }"
        @click="filterCourseByCategory('2')"
      >
        Category 2
      </li>
      <li
        class="category"
        :class="{ active: $route.query.category == 3 }"
        @click="filterCourseByCategory('3')"
      >
        Category 3
      </li>
      <li
        class="category"
        :class="{ active: $route.query.category == 4 }"
        @click="filterCourseByCategory('4')"
      >
        Category 4
      </li>
      <li
        class="category"
        :class="{ active: $route.query.category == 5 }"
        @click="filterCourseByCategory('5')"
      >
        Category 5
      </li>
    </ul>

    <div class="courses">
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
          <h4 class="course-title">
            {{ course.title }}
          </h4>
          <p class="course-info">{{ course.module_count }} module(s)</p>
          <!-- <p class="rating">-----------</p> -->
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
    return {};
  },

  computed: {
    courses() {
      return this.$store.state.course.courses;
    }
  },

  // beforeRouteUpdate(to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   console.log(to);
  //   next();
  // },

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

  mounted() {
    this.$store.dispatch("course/getCourses");
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/courses-page";
</style>
