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

    frontEndURL: "https://geospatialhub.netlify.app",

    site: {
      email: "geospatialhub@gmail.com",
      phone: "08012345678"
    },

    layout: {
      sidebarEnabled: true,
      components: ["users", "chats", "courses"]
      // components: ["chats", "users", "courses"]
    }
  },

  mutations: {
    showAlert(state, alert) {
      state.alert = alert;
      if (state.alert != null && state.alert.status == "error")
        state.alert.status = "danger";
    },
    disableSideBar(state) {
      state.layout.sidebarEnabled = false;
    },
    enableSideBar(state) {
      state.layout.sidebarEnabled = true;
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
