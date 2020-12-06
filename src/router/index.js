import Vue from "vue";
import VueRouter from "vue-router";
// Views
import Welcome from "../views/Welcome.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import PasswordForgot from "../views/PasswordForgot.vue";
import PasswordChange from "../views/PasswordChange.vue";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import Courses from "../views/Courses.vue";
import Notifications from "../views/Notifications.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import MyCourses from "../views/MyCourses.vue";
import Course from "../views/Course.vue";
import Profile from "../views/Profile.vue";
import UserProfile from "../views/UserProfile.vue";
import PostPage from "../views/PostPage.vue";
import UserPosts from "../views/UserPosts.vue";
import UserFollowing from "../views/UserFollowing.vue";
import UserFollowers from "../views/UserFollowers.vue";
import SearchPage from "../views/SearchPage.vue";
import Users from "../views/Users.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/password/reset",
    name: "PasswordForgot",
    component: PasswordForgot,
    meta: {
      guest: true
    }
  },
  {
    path: "/reset/:uid/:token",
    name: "PasswordChange",
    component: PasswordChange,
    meta: {
      guest: true
    }
  },
  {
    path: "",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/Layout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/courses",
        name: "Courses",
        component: Courses,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/about",
        name: "About",
        component: About,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users/:userId",
        name: "UserProfile",
        component: UserProfile,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users/:userId/posts",
        name: "UserPosts",
        component: UserPosts,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users/:userId/following",
        name: "UserFollowing",
        component: UserFollowing,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users/:userId/followers",
        name: "UserFollowers",
        component: UserFollowers,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/mycourses",
        name: "MyCourses",
        component: MyCourses,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/courses/:course",
        name: "Course",
        component: Course,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/posts/:post",
        name: "PostPage",
        component: PostPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/search",
        name: "SearchPage",
        component: SearchPage,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.user == null && localStorage.getItem("user") != null) {
    store.commit("auth/setUser", JSON.parse(localStorage.getItem("user")));
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.auth.user == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.auth.user == null) {
      next();
    } else {
      next({ path: "/home" });
    }
  } else {
    next();
  }
});

export default router;
