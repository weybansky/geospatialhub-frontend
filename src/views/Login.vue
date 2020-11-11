<template>
  <div class="login">
    <div class="menu">
      <!-- <div class="brand"> -->
      <router-link to="/" class="brand" tag="div">
        <img class="logo" src="@/assets/logo.png" alt="Logo" />
        <span class="brand-name">
          Geo<span class="text-blue">Science</span>
        </span>
      </router-link>
      <!-- </div> -->
      <div class="link">
        <span class="text">Don't have an Account?</span>
        <router-link class="button" to="/register">Create Profile</router-link>
      </div>
    </div>

    <div class="left">
      <!--  -->
    </div>
    <div class="right">
      <h3 class="greeting text-blue">Welcome</h3>

      <form
        class="login-form"
        method="POST"
        @submit.prevent="login"
        @keydown="handleFormError($event.target.name)"
      >
        <div
          class="form-group form-alert"
          v-if="alertShow"
          :class="alertStatus"
        >
          <small>{{ alertMessage }}</small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['far', 'envelope']"
            class="form-icon text-blue"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="text"
            name="username"
            v-model="username"
            placeholder="Email or Username"
            required
          />
          <small class="form-input-error" v-if="errors.username">
            {{ errors.username[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            class="form-icon text-blue"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="password"
            name="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <small class="form-input-error" v-if="errors.password">
            {{ errors.password[0] }}
          </small>
        </div>

        <div class="form-group submit">
          <div class="loader" v-if="loading"></div>
          <button class="submit-btn" type="submit" :disabled="loading">
            <template>Login</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faLock);

export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      errors: {},
      loading: false
    };
  },

  computed: {
    alertShow() {
      return this.$store.state.alert != null;
    },
    alertStatus() {
      const status = this.$store.state.alert.status || "";
      if (status == "error") return "danger";
      return status;
    },
    alertMessage() {
      return this.$store.state.alert.message || "";
    }
  },

  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("auth/login", {
          username: this.username,
          password: this.password
        })
        .catch(({ response }) => {
          this.errors = response.data || {};
          this.errors.username = response.data.username || null;
          this.errors.password = response.data.password || null;
          if (response.data.non_field_errors != null) {
            this.errors.username = response.data.non_field_errors;
          }

          this.$store.commit("showAlert", {
            message: response.data.message || "Login Failed",
            status: "error"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleFormError(field) {
      delete this.errors[field];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/login";
</style>
