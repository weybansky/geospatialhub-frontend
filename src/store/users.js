import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    users: [],
    usersConfig: {
      next: null,
      previous: null,
      count: 0
    },

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
    setUsersConfig(state, data) {
      state.usersConfig.count = data.count;
      state.usersConfig.next = data.next;
      state.usersConfig.previous = data.previous;
      // limit, offset, ordering, search;
    },
    addUsersToUsers(state, users) {
      // remove duplicate
      let existingUserIds = state.users.map(user => user.id);
      let newUsers = users.filter(user => !existingUserIds.includes(user.id));
      state.users = state.users.concat(newUsers);
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
      return await axios.get("/v1/users/").then(response => {
        commit("setUsers", response.data.results);
        commit("setUsersConfig", response.data);
        return response;
      });
    },
    async loadMoreUsers({ state, commit }, data) {
      if (state.usersConfig.next && data.isNext) {
        return await axios.get(state.usersConfig.next).then(response => {
          commit("addUsersToUsers", response.data.results);
          commit("setUsersConfig", response.data);
          return response;
        });
      }
      if (state.usersConfig.previous && !data.isNext) {
        return await axios.get(this.usersConfig.previous).then(response => {
          commit("addUsersToUsers", response.data.results);
          commit("setUsersConfig", response.data);
          return response;
        });
      }
      // return;
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
