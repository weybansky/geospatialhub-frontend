<template>
  <div id="app">
    <router-view />

    <div class="app-update" v-if="updateExists">
      An update is available
      <button @click="refreshApp">
        Update
      </button>
    </div>
  </div>
</template>

<script>
import update from "./mixins/update";
export default {
  name: "App",
  data() {
    return {};
  },
  mixins: [update]
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .app-update {
    position: fixed;
    z-index: 900;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 10px 15px;
    text-align: center;
    background: black;
    color: white;

    button {
      padding: 7px 10px;
      color: white;
      background: blue;
      border-radius: 5px;
      border: 0;
      outline: 0;
      cursor: pointer;
    }
  }
}
</style>
