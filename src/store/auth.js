import axios from "axios";
import moment from "moment";

export default {
  namespaced: true,

  state: () => ({
    user: null,
    courses: [],
    posts: [],
    notification: {
      count: 0,
      next: null,
      previous: null,
      unread_message_count: 0,
      unread_notifications_count: 0,
      notifications: []
    },

    followers: [],
    following: [],

    chats: [],
    chat: {
      receiver: null,
      messages: []
    }
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

    setNotificationConfig(state, data) {
      state.notification.count = data.count;
      state.notification.next = data.next;
      state.notification.previous = data.previous;
      state.notification.unread_message_count = data.unread_message_count;
      state.notification.unread_notifications_count =
        data.unread_notifications_count;
    },
    setNotifications(state, notifications) {
      state.notification.notifications = notifications || [];
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
    },

    setChatConfig(state, data) {
      state.chat.page = data.page || 1;
      state.chat.count = data.count || 0;
    },
    setChatReceiver(state, receiver) {
      state.chat.receiver = receiver || null;
    },
    setChatMessages(state, messages) {
      state.chat.messages = messages || [];
    },
    addMessageToMessages(state, message) {
      state.chat.messages.push(message);
    },

    setChat(state, chats) {
      state.chats = chats || [];
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
          return response;
        });
    },

    async updateUser({ state, dispatch }, user) {
      return await axios
        .patch("/v1/users/profile/" + state.user.id + "/", user)
        .then(response => {
          dispatch("getUser", null);
          return response;
        });
    },

    async updateUserImage({ state, dispatch }, formData) {
      // formData must contain profile_pic and banner_pic
      return await axios
        .post("/v1/users/profile/" + state.user.id + "/", formData)
        .then(response => {
          dispatch("getUser", null);
          return response;
        });
    },

    async getUserCourses({ commit, rootState }) {
      const courses = rootState.course.courses.filter(
        course => course.is_user_enrolled
      );
      if (courses.length) {
        commit("setUserCourses", courses);
        return courses;
      } else {
        await axios.get("/v1/courses/enrolled/").then(response => {
          commit("setUserCourses", response.data.results);
          return response;
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
      return await axios.get("/v1/users/notification/").then(response => {
        commit("setNotifications", response.data.results);
        return response;
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

    async changePasswordFromProfile(context, data) {
      return await axios.post("/v1/rest-auth/password/change/", data);
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
    },

    async getChats({ commit }) {
      return await axios.get("/v1/users/chats/").then(response => {
        commit("setChat", response.data.results);
        return response;
      });
    },

    async getChat({ commit }, data) {
      return await axios
        .get("/v1/users/chats/" + data.userId + "/")
        .then(response => {
          commit("setChatMessages", response.data.results);
          return response;
        });
    },

    async sendMessage({ dispatch }, data) {
      return await axios
        .post("/v1/users/chats/" + data.userId + "/", {
          text: data.text
        })
        .then(response => {
          // "addMessageToMessages"
          dispatch("getChat", data);
          return response;
        });
    },

    async getCountries() {
      return await axios
        .get(window.location.origin + "/countries.json")
        .then(({ data }) => {
          return data.countries;
        })
        .catch(() => {
          return [];
        });
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
      return state.notification.notifications;
    },

    sortMessages(state) {
      // TODO
      return state.chat.messages.slice().sort((m1, m2) => {
        const date1 = moment(m1.created);
        const date2 = moment(m2.created);
        if (date1.isAfter(date2)) {
          return 1;
        } else if (date2.isAfter(date1)) {
          return -1;
        }
        return 0;
      });
    },

    sortChats(state) {
      // TODO
      return state.chats.slice().sort((m1, m2) => {
        const date1 = moment(m1.created);
        const date2 = moment(m2.created);
        if (date1.isAfter(date2)) {
          return -1;
        } else if (date2.isAfter(date1)) {
          return 1;
        }
        return 0;
      });
    }
  },

  modules: {}
};
