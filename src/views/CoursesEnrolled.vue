<template>
  <section class="courses-page">
    <div class="page-title">
      <h1 class="title">
        My Courses <router-link to="/all-courses">All Courses</router-link>
      </h1>
      <!-- Feature section can be used to shoe general progress -->
    </div>

    <LoadSpinner :loading="loading" />

    <div class="courses" v-if="courses.length">
      <Course v-for="course in courses" :key="course.id" :course="course" />
    </div>

    <div class="courses" v-else>
      <div class="course text-center" style="flex: 100%">
        <div class="details">
          <h4 class="course-title">0 Courses</h4>
          <br />
          <router-link to="/courses" tag="p">
            <a class="text-blue">Take Courses from our amazing authors</a>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Course from "../components/Course";
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "CoursesEnrolled",

  components: { Course, LoadSpinner },

  data() {
    return { loading: false };
  },

  computed: {
    courses() {
      return this.$store.state.auth.courses;
    }
  },

  async mounted() {
    this.loading = true;
    await this.$store.dispatch("auth/getUserCourses");
    this.loading = false;
    if (this.$store.state.course.courses.length < 1) {
      await this.$store.dispatch("course/getCourses");
    }
  }
};
</script>
