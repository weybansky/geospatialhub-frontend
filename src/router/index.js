import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import Courses from "../views/Courses.vue";
import About from "../views/About.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
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
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/Layout.vue"),
    children: [
      {
        path: "",
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
        path: "/about",
        name: "About",
        component: About,
        meta: {
          requiresAuth: true
        }
      }
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   // component: Profile,
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: "/user/:username",
      //   name: "User",
      //   // component: User,
      //   meta: {
      //     requiresAuth: true
      //   }
      // }
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
      store.commit("showAlert", {
        status: "error",
        message: "Please Login"
      });
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
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
