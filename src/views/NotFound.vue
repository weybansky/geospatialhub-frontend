<template>
  <div>
    <h3>404</h3>
    <p v-html="message"></p>
    <button type="button" @click="back">Go back</button>
  </div>
</template>

<script>
export default {
  name: "Not Found",

  props: {
    message: {
      type: String,
      required: false,
      default: "Looks like you are off the planet"
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="sass" scoped></style>
