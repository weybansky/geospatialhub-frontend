<template>
  <div class="load-spinner" v-if="loading">
    <div class="spinner">
      <img src="/img/icons/favicon-32x32.png" alt="" />
    </div>
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
