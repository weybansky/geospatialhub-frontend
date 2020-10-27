import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    course: null,
    courses: []
  }),

  mutations: {
    course(state, course) {
      state.course = course || null;
    },
    courses(state, courses) {
      state.courses = courses || [];
    }
  },

  actions: {
    getCourses({ commit }) {
      axios
        .get("/v1/courses/")
        .then(response => {
          commit("courses", response.data);
        })
        .catch(error => {
          console.log(error.response.data);
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
