import Vue from "vue";
import Vuex from "vuex";

import authModule from "./auth";
import courseModule from "./course";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    appName: "GeoSpatial Hub",
    alert: null,
    users: []
  },

  mutations: {
    showAlert(state, alert) {
      state.alert = alert;
      if (state.alert != null && state.alert.status == "error")
        state.alert.status = "danger";
    },

    getUsers(state, users) {
      state.users = users;
    }
  },

  actions: {},

  getters: {},

  modules: {
    auth: authModule,
    course: courseModule
  }
});
