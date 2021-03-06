import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    posts: [],
    postsConfig: {
      next: null,
      previous: null,
      count: 0
    },

    post: null,
    comments: [],

    search: {
      count: 0,
      page: 1,
      posts: [],
      //
      previous: null,
      next: null
    }
  }),

  mutations: {
    setPosts(state, posts) {
      state.posts = posts || [];
    },
    setPostsConfig(state, data) {
      state.postsConfig.count = data.count;
      state.postsConfig.next = data.next;
      state.postsConfig.previous = data.previous;
      // limit, offset, ordering, search;
    },
    addPreviousPostToPosts(state, posts) {
      // remove duplicate
      let existingPostIds = state.posts.map(post => post.id);
      let newPosts = posts.filter(post => !existingPostIds.includes(post.id));
      state.posts = state.posts.concat(newPosts);
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
      if (!data.isComment) {
        state.posts.map(post => {
          if (post.id == data.postId) {
            post.likes_count = data.likesCount;
            post.authenticated_user_like_status = data.postWasLiked;
          }
        });
      } else {
        state.comments.map(comment => {
          if (comment.id == data.postId) {
            comment.likes_count = data.likesCount;
            comment.authenticated_user_like_status = data.postWasLiked;
          }
        });
      }
    },

    setSearchConfig(state, data) {
      state.search.page = data.page;
      state.search.count = data.count;
    },
    setSearchPosts(state, posts) {
      state.search.posts = posts || [];
    },
    addToSearchPosts(state, posts) {
      state.search.push(posts);
    }
  },

  actions: {
    // Get all post
    async getPosts({ commit }) {
      return await axios.get("/v1/users/post/").then(response => {
        commit("setPosts", response.data.results);
        commit("setPostsConfig", response.data);
        return response;
      });
    },

    async loadMorePosts({ state, commit }, data) {
      if (state.postsConfig.next && data.isNext) {
        return await axios.get(state.postsConfig.next).then(response => {
          commit("addPreviousPostToPosts", response.data.results);
          commit("setPostsConfig", response.data);
          return response;
        });
      }
      if (state.postsConfig.previous && !data.isNext) {
        return await axios.get(this.postsConfig.previous).then(response => {
          commit("addPreviousPostToPosts", response.data.results);
          commit("setPostsConfig", response.data);
          return response;
        });
      }
      // return;
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
      return await axios.post("/v1/users/post/", formData).then(response => {
        if (formData.get("in_reply_to_post")) {
          // comment
          commit("addCommentToComments", response.data);
        } else {
          // new post
          commit("setPost", response.data);
          commit("addPostToPosts", response.data);
        }
        return response;
      });
    },

    // Delete post
    async deletePost({ commit }, data) {
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
    async likePost({ state, commit }, likeData) {
      return await axios
        .post("/v1/users/post/rate/" + likeData.postId + "/", { liked: true })
        .then(response => {
          // update the likes_count on post with total_likes
          // get current like;
          let oldPost = null;
          if (
            state.posts.filter(post => post.id == likeData.postId).length > 0
          ) {
            oldPost = state.posts.filter(post => post.id == likeData.postId)[0];
          } else {
            oldPost - state.post;
          }
          const oldPostLikes = oldPost.likes_count;
          const newLikes = response.data.total_likes;

          if (newLikes > oldPostLikes) {
            response.data.postWasLiked = true;
          } else {
            response.data.postWasLiked = false;
          }

          commit("updatePostLikes", {
            postId: likeData.postId,
            likesCount: response.data.total_likes,
            postWasLiked: response.data.postWasLiked,
            isComment: likeData.isComment || false
          });

          return response;
        });
    },

    async searchPosts({ commit }, query) {
      let orderWithColumn = 1;
      let page = 1;
      return await axios
        .get("/v1/users/post/", {
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
          commit("setSearchPosts", response.data.results || []);
          return response;
        });
    }
  },

  getters: {},

  modules: {}
};
