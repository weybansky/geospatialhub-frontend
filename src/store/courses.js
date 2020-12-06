import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    course: null,
    courses: [],
    categories: [],

    search: {
      count: 0,
      page: 1,
      courses: [],
      //
      previous: null,
      next: null
    }
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
    },

    setSearchConfig(state, data) {
      state.search.page = data.page;
      state.search.count = data.count;
    },
    setSearchCourses(state, courses) {
      state.search.courses = courses || [];
    },
    addToSearchCourses(state, courses) {
      state.search.push(courses);
    }
  },

  actions: {
    async getCourses({ commit }) {
      return await axios.get("/v1/courses/").then(({ data }) => {
        commit("setCourses", data.results);
      });
    },

    async getCategories({ commit }) {
      return await axios.get("/v1/courses/categories/").then(({ data }) => {
        commit("setCategories", data.results);
      });
    },

    async getCourse({ state, commit }, courseId) {
      if (state.courses.length) {
        let course = state.courses.filter(course => course.id == courseId);
        if (course.length == 1) {
          commit("setCourse", course[0]);
          return course[0];
        }
      }

      return await axios
        .get("/v1/courses/" + courseId + "/")
        .then(({ data }) => {
          commit("setCourse", data);
        });
    },

    async searchCourses({ commit }, query) {
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
          commit("setSearchConfig", {
            page: page,
            count: response.data.results || []
          });
          commit("setSearchCourses", response.data.results || []);
          return response;
        });
    }
  },

  getters: {},

  modules: {}
};
