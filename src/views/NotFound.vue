<template>
  <div class="not-found-page">
    <h3 class="code text-blue">404</h3>
    <p class="tagline" v-html="message"></p>
    <div class="action">
      <button class="back bg-blue" type="button" @click="goBack">
        Go back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Not-Found",

  props: {
    message: {
      type: String,
      required: false,
      default: "Looks like you are off the planet"
    }
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";

.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: 100vh;
  background-color: darken($color-white, 8%);

  .code {
    margin: 0.85rem 0;
    font-size: 3.5rem;
  }

  .tagline {
    margin: 0.85rem 0;
    font-size: 1.6rem;
  }

  .action {
    margin: 0.85rem 0;
    .back {
      padding: 0.85rem 1.4rem;
      border: 0;
      outline: 0;
      border-radius: 5px;
      color: #ffffff;
      font-size: 1.15rem;
    }
  }
}
</style>
