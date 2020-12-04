<template>
  <div class="login-page bg-blue text-white">
    <main class="main">
      <router-link class="brand" to="/">
        <img
          class="logo"
          src="@/assets/logo/transparent_white.png"
          alt="Geospatial Hub Logo"
        />
      </router-link>

      <h3 class="greeting">Welcome , Login</h3>

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
          <button class="submit-btn" type="submit" :disabled="loading">
            <div class="loader" v-if="loading"></div>
            <template>Login</template>
          </button>
        </div>

        <div class="form-group forgot-password-link">
          <hr />
          <a href="password/reset">forgot your password ?</a>
          <hr />
        </div>

        <div class="form-group submit">
          <a class="submit-btn" href="/register">Register</a>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
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
