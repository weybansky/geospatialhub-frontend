<template>
  <div class="load-more">
    <button v-if="!loading" @click="loadMore">{{ text }}</button>
    <span v-else>Loading...</span>
    <LoadSpinner :loading="loading" />
  </div>
</template>

<script>
import LoadSpinner from "../components/LoadSpinner.vue";

export default {
  name: "LoadMore",

  components: {
    LoadSpinner
  },

  props: {
    text: { type: String, required: false, default: "Load More" },
    loading: { type: Boolean, required: true, default: false },
    isNext: { type: Boolean, required: false, default: true }
  },

  data() {
    return {};
  },

  methods: {
    loadMore() {
      this.$emit("loadMore", { isNext: this.isNext });
    }
  }
};
</script>
