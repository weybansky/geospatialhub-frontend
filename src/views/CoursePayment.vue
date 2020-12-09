<template>
  <section class="payment-page page text-center">
    <div class="success" v-if="!loading && status == 'success'">
      <svg
        class="icon text-green"
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
      <h3>Payment SuccessFul</h3>
      <button type="button" class="bg-green text-white" @click="goToCourse">
        Go to Course
      </button>
    </div>
    <div class="error" v-if="!loading && status != 'success'">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="times"
        class="icon text-red"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
      >
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        ></path>
      </svg>
      <h3>Payment not SuccessFul</h3>
      <button type="button" class="bg-red text-white" @click="goToCourse">
        Go to Course
      </button>
    </div>
    <div class="error" v-if="loading">
      <p>Loading...</p>
    </div>
    <LoadSpinner :loading="loading" />
  </section>
</template>

<script>
import LoadSpinner from "../components/LoadSpinner.vue";
export default {
  name: "CoursePayment",

  components: { LoadSpinner },

  data() {
    return {
      loading: false,
      status: ""
    };
  },

  computed: {
    courseId() {
      return this.$route.params.courseId;
    }
  },

  methods: {
    goToCourse() {
      window.location.href = `/courses/${this.courseId}`;
      return;
    }
  },

  mounted() {
    setTimeout(() => {
      this.goToCourse();
    }, 20000);
  },

  async created() {
    const courseId = this.$route.params.courseId;
    this.loading = true;
    await this.$store
      .dispatch("course/confirmPayment", courseId)
      .then(({ data }) => {
        this.status = data.status;
      })
      .catch(() => {
        this.status = "error";
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;

  .success,
  .error {
    .icon {
      border-radius: 50%;
      border: 1px solid;
      padding: 5px;
      height: 2.8rem;
      width: 2.8rem;
    }
    h3 {
      font-size: 2rem;
      margin: 1rem 0;

      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin: 0.8rem 0;
      }
    }
    button {
      outline: 0;
      border: 0;
      padding: 0.75rem 1rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
