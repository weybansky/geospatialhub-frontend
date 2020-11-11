import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    course: null,
    courses: [],
    categories: []
  }),

  mutations: {
    course(state, course) {
      state.course = course || null;
    },

    courses(state, courses) {
      state.courses = courses || [];
    },

    categories(state, categories) {
      state.categories = categories || [];
      // .sort(function(a, b) {
      //     return a.title - b.title;
      //   })
    }
  },

  actions: {
    async getCourses({ commit }) {
      return await axios
        .get("/v1/courses/")
        .then(response => {
          commit("courses", response.data.courses);
          commit("categories", response.data.categories);
        })
        .catch(() => {
          commit(
            "showAlert",
            {
              status: "danger",
              message: "Failed to load courses"
            },
            { root: true }
          );
        });
    }
  },

  getters: {},

  modules: {}
};
