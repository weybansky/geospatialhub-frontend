<template>
  <section class="courses-page">
    <div class="page-title">
      <h1 class="title">
        My Courses <router-link to="/courses">All Courses</router-link>
      </h1>
      <!-- Feature section can be used to shoe general progress -->
    </div>

    <div class="courses" v-if="myCourses.length">
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
export default {
  name: "MyCourses",

  data() {
    return {};
  },

  computed: {
    myCourses() {
      return this.$store.state.auth.courses;
    }
  },

  async mounted() {
    if (this.$store.state.auth.courses.length < 1) {
      await this.$store.dispatch("auth/getUserCourses");
    }
    if (this.$store.state.course.courses.length < 1) {
      await this.$store.dispatch("course/getCourses");
    }
  }
};
</script>
