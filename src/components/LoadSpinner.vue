<template>
  <div class="load-spinner" v-if="loading">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "LoadSpinner",

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
