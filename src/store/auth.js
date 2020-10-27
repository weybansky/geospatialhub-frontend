import axios from "axios";
// import router from "../router";

export default {
  namespaced: true,
  state: () => ({
    user: null
  }),

  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user == null) {
        localStorage.setItem("user", null);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  },

  actions: {
    register(context, data) {
      return axios.post("/v1/rest-auth/registration/", data, {
        headers: {
          Authorization: null
        }
      });
    },

    login(context, data) {
      return axios.post("/v1/rest-auth/login/", data, {
        headers: {
          Authorization: null
        }
      });
    },

    logout({ commit }) {
      axios
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

    getUser({ commit }) {
      const id = 1; // TODO
      axios
        .post("/v1/users/" + id + "/")
        .then(response => {
          commit("setUser", response.data.user);
          // router.push("/");
        })
        .catch(error => {
          commit(
            "showAlert",
            {
              message: error.response.data.message || "Could not load user",
              status: "error"
            },
            { root: true }
          );
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
    }
  },

  modules: {}
};
