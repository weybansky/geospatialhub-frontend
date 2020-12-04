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
      state.comments = comments || [];
    },

    addPostToPosts(state, post) {
      state.posts.unshift(post);
    },

    removePostFromPosts(state, postId) {
      state.posts = state.posts.filter(post => post.id != postId);
    },

    addCommentToComments(state, comment) {
      state.comments.unshift(comment);
    },

    removeCommentFromComments(state, commentId) {
      state.comments = state.comments.filter(
        comment => comment.id != commentId
      );
    },

    updatePostLikes(state, data) {
      state.posts.map(post => {
        if (post.id == data.postId) {
          post.likes_count = data.likesCount;
        }
      });
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
      if (state.posts.length) {
        const post = state.posts.filter(post => post.id == postId)[0] || null;
        if (post) {
          return commit("setPost", post);
        }
      }
      return axios.get("/v1/users/post/" + postId + "/").then(({ data }) => {
        commit("setPost", data);
        commit("addPostToPosts", data);
      });
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
        if (formData.get("in_reply_to_post")) {
          // comment
          commit("addCommentToComments", data);
        } else {
          // new post
          commit("setPost", data);
          commit("addPostToPosts", data);
        }
      });
    },

    // Delete post
    async deletePost({ commit }, data) {
      // console.log(data.postId, data.isComment);
      return await axios
        .delete("/v1/users/post/" + data.postId + "/")
        .then(() => {
          if (data.isComment) {
            commit("removeCommentFromComments", data.postId);
          } else {
            commit("removePostFromPosts", data.postId);
          }
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
    async likePost({ commit }, postId) {
      return await axios
        .post("/v1/users/post/rate/" + postId + "/", { liked: true })
        .then(({ data }) => {
          // update the likes_count on post with total_likes
          commit("updatePostLikes", {
            postId: postId,
            likesCount: data.total_likes
          });
        });
    }
  },

  getters: {},

  modules: {}
};
