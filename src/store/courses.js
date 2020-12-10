import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    course: null,
    courseModule: null,
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

    setCourseModule(state, courseModule) {
      state.courseModule = courseModule || null;
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
      return await axios.get("/v1/courses/").then(response => {
        commit("setCourses", response.data.results);
        return response;
      });
    },

    async getCategories({ commit }) {
      return await axios.get("/v1/courses/categories/").then(({ data }) => {
        commit("setCategories", data.results);
      });
    },

    async getCourse({ commit }, courseId) {
      return await axios.get("/v1/courses/" + courseId + "/").then(response => {
        commit("setCourse", response.data);
        return response;
      });
    },

    getModule({ state, commit, dispatch }, data) {
      if (state.course && state.course.modules.length) {
        let mod = state.course.modules.filter(mod => mod.id == data.moduleId);
        if (mod) {
          commit("setCourseModule", mod[0]);
          return mod[0];
        }
      } else {
        dispatch("getCourse", data.courseId).then(() => {
          return dispatch("getModule", data);
        });
      }
    },

    async payForCourse({ rootState }, courseId) {
      return await axios
        .get("/v1/courses/" + courseId + "/pay/", {
          params: {
            callback_url: `${rootState.frontEndURL}/courses/${courseId}/payment/`
          }
        })
        .then(response => {
          window.location.href = response.data.authorization_url;
          return response;
        });
    },

    async confirmPayment(context, courseId) {
      return await axios
        .get("/v1/courses/" + courseId + "/pay/confirm/")
        .then(response => {
          return response;
        });
    },

    async unenroll(context, courseId) {
      return await axios.get("/v1/courses/" + courseId + "/unenroll/");
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
    },

    async getCourseChats(context, courseId) {
      return await axios
        .get("/v1/courses/" + courseId + "/chats/")
        .then(response => {
          return response;
        });
    },

    async postCourseChat(context, courseId) {
      return await axios
        .post("/v1/courses/" + courseId + "/chats/")
        .then(response => {
          return response;
        });
    }
  },

  getters: {},

  modules: {}
};
