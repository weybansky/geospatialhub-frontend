import Vue from "vue";
import Vuex from "vuex";

import authModule from "./auth";
import courseModule from "./courses";
import userModule from "./users";
import postModule from "./posts";

import axios from "axios";
import router from "../router";

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
      components: ["chats", "ads"],
      user: {
        count: 0,
        page: 1,
        users: [],
        //
        previous: null,
        next: null
      },
      // chat: {},//from auth
      course: {
        count: 0,
        page: 1,
        users: [],
        //
        previous: null,
        next: null
      }
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
    },
    setSidebarComponents(state, components) {
      components.push("ads");
      state.layout.components = components || ["chats", "ads"];
      if (window.screen.width < 768) {
        const route = router.app.$route.name;
        console.log(route);
        if (route == "Home" || route == "UserChat" || route == "CourseChat") {
          this.commit("disableSideBar");
        } else {
          this.commit("enableSideBar");
          state.layout.components = ["ads"];
        }
      }
    },

    setSidebarUsersConfig(state, data) {
      state.layout.user.page = data.page;
      state.layout.user.count = data.count;
    },
    setSidebarUsers(state, users) {
      state.layout.user.users = users || [];
    },

    setSidebarCourseConfig(state, data) {
      state.layout.course.page = data.page;
      state.layout.course.count = data.count;
    },
    setSidebarCourses(state, courses) {
      state.layout.course.courses = courses || [];
    }
  },

  actions: {
    async getLayoutUsers({ commit }) {
      let query = "";
      let orderWithColumn = 1;
      let page = 1;
      return await axios
        .get("/v1/users/list-all/", {
          params: {
            search: query,
            ordering: orderWithColumn,
            page: page
          }
        })
        .then(response => {
          commit("setSidebarUsersConfig", {
            page: page,
            count: response.data.results || []
          });
          commit("setSidebarUsers", response.data.results || []);
          return response;
        });
    },

    async getLayoutCourses({ commit }) {
      let query = "";
      let orderWithColumn = 1;
      let page = 1;
      return await axios
        .get("/v1/courses/", {
          params: {
            search: query,
            ordering: orderWithColumn,
            page: page
          }
        })
        .then(response => {
          commit("setSidebarCourseConfig", {
            page: page,
            count: response.data.results || []
          });
          commit("setSidebarCourses", response.data.results || []);
          return response;
        });
    }
  },

  getters: {},

  modules: {
    auth: authModule,
    course: courseModule,
    user: userModule,
    post: postModule
  }
});
