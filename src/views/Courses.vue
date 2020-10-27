<template>
  <div>
    <div v-if="courses.length">
      <div v-for="course in courses" :key="course.id">
        <h4>{{ course.title }}</h4>
        <p><a :href="'/courses/' + course.id">View</a></p>
      </div>
    </div>
    <div v-else>
      <p>No Courses</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Courses",

  computed: {
    courses() {
      return this.$store.state.course.courses;
    }
  },

  mounted() {
    this.$store.dispatch("course/getCourses");
  }
};
</script>
