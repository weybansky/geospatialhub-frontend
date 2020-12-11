<template>
  <div class="welcome-page bg-blue text-white">
    <nav class="container">
      <div class="logo">
        <img src="@/assets/logo/standard_small.png" alt="Geospatial Hub Logo" />
      </div>

      <form @submit.prevent="search" class="search">
        <svg
          class="search-icon text-blue"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.105 26.105C26.3372 25.8726 26.6129 25.6882 26.9164 25.5624C27.2199 25.4366 27.5452 25.3718 27.8737 25.3718C28.2023 25.3718 28.5276 25.4366 28.8311 25.5624C29.1346 25.6882 29.4103 25.8726 29.6425 26.105L39.2675 35.73C39.7366 36.1988 40.0003 36.8347 40.0005 37.4979C40.0007 38.1611 39.7375 38.7972 39.2687 39.2663C38.8 39.7354 38.164 39.9991 37.5009 39.9993C36.8377 39.9995 36.2016 39.7363 35.7325 39.2675L26.1075 29.6425C25.875 29.4104 25.6906 29.1346 25.5648 28.8311C25.439 28.5276 25.3743 28.2023 25.3743 27.8738C25.3743 27.5453 25.439 27.2199 25.5648 26.9164C25.6906 26.6129 25.875 26.3372 26.1075 26.105H26.105Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.25 30C18.0557 30 19.8437 29.6443 21.5119 28.9533C23.1801 28.2623 24.6959 27.2495 25.9727 25.9727C27.2495 24.6959 28.2623 23.1801 28.9533 21.5119C29.6443 19.8437 30 18.0557 30 16.25C30 14.4443 29.6443 12.6563 28.9533 10.9881C28.2623 9.31988 27.2495 7.80409 25.9727 6.52728C24.6959 5.25048 23.1801 4.23766 21.5119 3.54666C19.8437 2.85565 18.0557 2.5 16.25 2.5C12.6033 2.5 9.10591 3.94866 6.52728 6.52728C3.94866 9.10591 2.5 12.6033 2.5 16.25C2.5 19.8967 3.94866 23.3941 6.52728 25.9727C9.10591 28.5513 12.6033 30 16.25 30ZM32.5 16.25C32.5 20.5598 30.788 24.693 27.7405 27.7405C24.693 30.788 20.5598 32.5 16.25 32.5C11.9402 32.5 7.80698 30.788 4.75951 27.7405C1.71205 24.693 0 20.5598 0 16.25C0 11.9402 1.71205 7.80698 4.75951 4.75951C7.80698 1.71205 11.9402 0 16.25 0C20.5598 0 24.693 1.71205 27.7405 4.75951C30.788 7.80698 32.5 11.9402 32.5 16.25Z"
            fill="currentColor"
          />
        </svg>
        <input type="text" class="bg-white" v-model="searchInput" required />
        <button type="submit" class="bg-blue text-white">SEARCH</button>
      </form>

      <div class="links" v-if="!authenticated">
        <router-link v-if="!authenticated" class="link blue" to="/register">
          Join Now
        </router-link>
        <router-link v-if="!authenticated" class="link white" to="/login">
          Sign In
        </router-link>
        <router-link v-if="authenticated" class="link blue" to="/home">
          Home
        </router-link>
      </div>
    </nav>

    <main class="container">
      <div
        class="left"
        :style="{ 'background-image': `url(${backgroundImage[index]})` }"
      >
        <!--  -->
      </div>

      <div class="right">
        <h1>Welcome to your professional community</h1>
        <p class="">
          This is an awesome community where you meet geospatial professionals
          and connect with mentor and create credible solution hub for
          geospatial needs.
        </p>
        <div class="links">
          <router-link to="/login" class="link bg-blue text-white">
            Get Started
          </router-link>
        </div>
      </div>
    </main>

    <footer class="container">
      <h2>The larget selection of Geospatial Courses from Africa</h2>
      <p class="courses">
        <span class="course" v-for="course in courses" :key="course.id">
          {{ course.title }}
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Welcome",

  data() {
    return {
      searchInput: "",
      backgroundImage: [
        "/img/bg_welcome_11.png",
        "/img/bg_welcome_22.png",
        "/img/bg_welcome_33.png"
      ],
      index: 0,
      animation: null
    };
  },

  computed: {
    authenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },

    courses() {
      return [];
      // return this.$store.state.course.courses.slice(0, 10);
    }
  },

  methods: {
    search() {
      this.$router.push("/search?q=" + this.query);
    },

    logout() {
      this.$store.dispatch("auth/logout");
    }
  },

  async beforeRouteLeave(to, from, next) {
    await clearInterval(this.animation);
    next();
  },

  async mounted() {
    this.animation = setInterval(() => {
      this.index += 1;
      if (this.index > 2) this.index = 0;
    }, 3000);
    if (this.$store.state.course.courses.length < 1) {
      // axios.defaults.headers.common["Authorization"] = null;
      // await axios
      //   .get("/v1/courses/", null, {
      //     headers: { Authorization: "vrkjvjbjvfvbhjfdbvjbj" }
      //   })
      //   .then(({ data }) => {
      //     console.log(data.results);
      //     this.$store.commit("course/setCourses", data.results);
      //   })
      //   .catch(error => {
      //     console.log(error.response);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/welcome";
</style>
