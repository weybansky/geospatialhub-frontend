import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    course: null,
    courses: [],
    categories: []
  }),

  mutations: {
    setCourse(state, course) {
      state.course = course || null;
    },

    setCourses(state, courses) {
      state.courses = courses || [];
    },

    setCategories(state, categories) {
      state.categories = categories || [];
      // .sort(function(a, b) {
      //     return a.title - b.title;
      //   })
    }
  },

  actions: {
    async getCourses({ commit }) {
      return await axios.get("/v1/courses/").then(({ data }) => {
        commit("setCourses", data);
      });
    },

    async getCategories({ commit }) {
      return await axios.get("/v1/courses/categories/").then(({ data }) => {
        commit("setCategories", data);
      });
    }
  },

  getters: {},

  modules: {}
};
