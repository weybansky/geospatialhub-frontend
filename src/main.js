import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";

import VueYouTubeEmbed from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed, { global: false });

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// if (process.env.NODE_ENV === "production") {
axios.defaults.baseURL = "https://geospatialhub.herokuapp.com/api/";
// } else {
//   axios.defaults.baseURL = "http://localhost:8000/api/";
// }
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Token " + token;
// axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, function(err) {
  return new Promise(function() {
    if (
      err.response.status === 401 &&
      err.response.config &&
      !err.response.config.__isRetryRequest
    ) {
      store.dispatch("auth/logout");
    }
    throw err;
  });
});

// 500 error response
axios.interceptors.response.use(undefined, function(err) {
  return new Promise(function() {
    if (
      err.response.status === 500 &&
      err.response.config &&
      !err.response.config.__isRetryRequest
    ) {
      err.response.data.message = "Something went wrong";
    }
    throw err;
  });
});

window.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
