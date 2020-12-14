import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    users: [],

    user: {
      id: 0,
      username: "",
      email: "",
      profile: {
        first_name: "",
        last_name: "",
        phone: null,
        profile_pic: null,
        bio: "",
        date_of_birth: null,
        location_city: "",
        location_state: "",
        location_country: "",
        organisation: "",
        institution: "",
        occupation: "",
        follower_count: 0,
        following_count: 0,
        follow_status: "Follow",
        unread_count: 0,
        post_count: 0,
        enrolled_for: []
      }
    },

    search: {
      count: 0,
      page: 1,
      users: [],
      //
      previous: null,
      next: null
    }
  }),

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setUser(state, user) {
      state.user = user;
    },

    setSearchConfig(state, data) {
      state.search.page = data.page;
      state.search.count = data.count;
    },
    setSearchUsers(state, users) {
      state.search.users = users || [];
    },
    addToSearchUsers(state, users) {
      state.search.push(users);
    }
  },

  actions: {
    async getUsers({ commit }) {
      return await axios.get("/v1/users/").then(({ data }) => {
        commit("setUsers", data.results);
      });
    },

    async getUser({ commit }, userId) {
      return await axios.get("/v1/users/" + userId + "/").then(response => {
        commit("setUser", response.data);
        return response;
      });
    },

    getUserPosts(context, data) {
      return axios.get("/v1/users/" + data.userId + "/post/");
    },

    getFollowers(context, data) {
      return axios.get("/v1/users/followers/" + data.userId + "/", data);
    },

    getFollowing(context, data) {
      return axios.get("/v1/users/following/" + data.userId + "/", data);
    },

    async searchUsers({ commit }, query) {
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
          commit("setSearchConfig", {
            page: page,
            count: response.data.results || []
          });
          commit("setSearchUsers", response.data.results || []);
          return response;
        });
    }
  },

  getters: {},

  modules: {}
};
