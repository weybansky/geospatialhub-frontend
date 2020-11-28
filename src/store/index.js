import Vue from "vue";
import Vuex from "vuex";

import authModule from "./auth";
import courseModule from "./courses";
import userModule from "./users";
import postModule from "./posts";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    appName: "GeoSpatial Hub",
    alert: null,

    site: {
      email: "geospatialhub@gmail.com",
      phone: "08012345678"
    },

    layout: {
      sidebarEnabled: true,
      components: ["messaging", "users", "courses"]
    },

    PAYSTACK_PUBLIC_KEY: null
  },

  mutations: {
    showAlert(state, alert) {
      state.alert = alert;
      if (state.alert != null && state.alert.status == "error")
        state.alert.status = "danger";
    }
  },

  actions: {},

  getters: {},

  modules: {
    auth: authModule,
    course: courseModule,
    user: userModule,
    post: postModule
  }
});
