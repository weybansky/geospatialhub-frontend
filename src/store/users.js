import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    users: []
  }),

  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },

  actions: {
    async getUsers({ commit }) {
      return await axios.get("/v1/users/").then(({ data }) => {
        commit("setUsers", data);
      });
    },

    async getUser(context, id) {
      axios
        .post("/v1/users/" + id + "/")
        .then(({ data }) => {
          return data;
        })
        .catch(() => {
          throw "Failed to get user";
        });
    }
  },

  getters: {},

  modules: {}
};
