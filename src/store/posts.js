import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    posts: [],

    post: null,
    comments: []
  }),

  mutations: {
    setPosts(state, posts) {
      state.posts = posts || [];
    },

    setPost(state, post) {
      state.post = post || null;
    },

    setComments(state, comments) {
      state.comments = comments || null;
    }
  },

  actions: {
    // Get all post
    async getPosts({ commit }) {
      return await axios.get("/v1/users/post/").then(({ data }) => {
        commit("setPosts", data.results);
      });
    },

    // Get single post with id
    getPost({ state, commit }, postId) {
      return commit(
        "setPost",
        state.posts.filter(post => post.id == postId)[0] || null
      );
    },

    // Get Post comments
    async getPostComments({ commit }, postId) {
      return await axios
        .get("/v1/users/post/retrieve-comments/" + postId + "/")
        .then(({ data }) => {
          commit("setComments", data);
        });
    },

    // Create a new post
    async createPost({ commit }, formData) {
      // text & image
      return await axios.post("/v1/users/post/", formData).then(({ data }) => {
        commit("setPost", data);
        return data;
      });
    },

    // Create a new comment
    async postComment({ state, commit }, postId, formData) {
      // text & image
      formData.append("in_reply_to_post", postId);
      return await axios.post("/v1/users/post/", formData).then(({ data }) => {
        // TODO - Review this
        // add to the existing comments
        // fetch the comments again
        commit("setComment", state.comments.push(data));
      });
    },

    // Like/Un-like a post
    async likePost({ state, commit }, postId) {
      return await axios
        .post("/v1/users/post/rate/" + postId + "", { liked: true })
        .then(({ data }) => {
          // update the likes_count on post with total_likes
          commit(
            "setPosts",
            state.posts.map(post => {
              if (post.id == postId) {
                post.like_count = data.total_likes;
              }
            })
          );
        });
    }
  },

  getters: {},

  modules: {}
};