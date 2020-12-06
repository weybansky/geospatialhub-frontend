import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    user: null,
    courses: [],
    posts: [],
    notifications: {
      unread_message_count: 0,
      new_follower: []
    },
    followers: [],
    following: []
  }),

  mutations: {
    setUser(state, user) {
      state.user = user || null;
      if (user == null) {
        localStorage.setItem("user", null);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    setUserCourses(state, courses) {
      state.courses = courses || [];
    },

    setPosts(state, posts) {
      state.posts = posts || [];
    },

    setNotifications(state, notifications) {
      state.notifications = notifications || {
        unread_message_count: 0,
        new_follower: []
      };
    },

    setFollowers(state, followers) {
      state.followers = followers || [];
    },

    addFollowerToFollowers(state, follower) {
      state.followers.unshift(follower);
    },

    setFollowing(state, following) {
      state.following = following || [];
    },

    addFollowToFollowing(state, follow) {
      state.following.unshift(follow);
    }
  },

  actions: {
    async register({ commit }, data) {
      return await axios
        .post("/v1/rest-auth/registration/", data, {
          headers: {
            Authorization: null
          }
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.key);
          commit("setUser", data.user);
          commit(
            "showAlert",
            {
              message: "Welcome",
              status: "success"
            },
            { root: true }
          );
          window.location.href = "/home";
        });
    },

    async login({ commit }, data) {
      return await axios
        .post("/v1/rest-auth/login/", data, {
          headers: {
            Authorization: null
          }
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.key);
          commit("setUser", data.user);
          commit(
            "showAlert",
            {
              message: "Logged in",
              status: "success"
            },
            { root: true }
          );
          window.location.href = "/home";
        });
    },

    async logout({ commit }) {
      return await axios
        .post("/v1/rest-auth/logout/", null, {
          headers: { Authorization: null }
        })
        .then(() => {
          localStorage.setItem("token", null);
          commit("setUser", null);
          commit(
            "showAlert",
            {
              message: "Logged out",
              status: "success"
            },
            { root: true }
          );
          window.location.href = "/";
        });
    },

    async getUser({ state, commit }) {
      return await axios
        .get("/v1/users/" + state.user.id + "/")
        .then(response => {
          commit("setUser", response.data);
        });
    },

    async updateUser({ state, commit }, data) {
      // {
      //   "username": "weybansky",
      //   "profile": {
      //         "first_name": "Abdulwahab",
      //         "last_name": "Nasir",
      //         "phone": null,
      //         "profile_pic": null,
      //         "bio": "",
      //         "date_of_birth": null,
      //         "location_city": "",
      //         "location_state": "",
      //         "location_country": "",
      //         "company": ""
      //     }
      // }
      return await axios
        .put("/v1/users/" + state.user.id + "/", data)
        .then(({ data }) => {
          commit("setUser", data);
        })
        .catch();
    },

    async updateUserProfilePicture({ state, commit }, formData) {
      // formData must contain profile_pic
      return await axios
        .put("/v1/users/" + state.user.id + "/profile/", formData)
        .then(({ data }) => {
          commit("setUser", data);
        });
    },

    async getUserCourses({ commit, rootState }) {
      const courses = rootState.course.courses.filter(
        course => course.is_user_enrolled
      );
      if (courses.length) {
        commit("setUserCourses", courses);
      } else {
        await axios.get("/v1/courses/enrolled/").then(({ data }) => {
          commit("setUserCourses", data.results);
        });
      }
    },

    async getUserPosts({ state, commit, dispatch }) {
      return await dispatch(
        "user/getUserPosts",
        { userId: state.user.id },
        { root: true }
      ).then(({ data }) => {
        commit("setPosts", data.results);
      });
    },

    async getNotifications({ commit }) {
      return await axios.get("/v1/users/notification/").then(({ data }) => {
        commit("setNotifications", data);
      });
    },

    async sendResetEmail(context, data) {
      axios.defaults.headers.common["Authorization"] = null;
      return await axios.post("/v1/rest-auth/password/reset/", data);
    },

    async changePassword(context, data) {
      axios.defaults.headers.common["Authorization"] = null;
      return await axios.post("/v1/rest-auth/password/reset/confirm/", data);
    },

    async followUser(context, user) {
      return await axios.get("/v1/users/follow/" + user.userId + "/");
    },

    async getFollowers({ state, commit, dispatch }, data) {
      data.userId = state.user.id;
      return await dispatch("user/getFollowers", data, { root: true }).then(
        ({ data }) => {
          commit("setFollowers", data.results);
        }
      );
    },

    async getFollowing({ state, commit, dispatch }, data) {
      data.userId = state.user.id;
      return await dispatch("user/getFollowing", data, { root: true }).then(
        ({ data }) => {
          commit("setFollowing", data.results);
        }
      );
    }
  },

  getters: {
    isAuthenticated(state) {
      if (state.user != null && localStorage.getItem("token") != null) {
        return true;
      } else {
        return false;
      }
    },

    fullname(state) {
      const userProfile = state.user.profile;
      return userProfile.first_name + " " + userProfile.last_name;
    },

    sortNotifications(state) {
      // TODO
      return state.notications;
    }
  },

  modules: {}
};
