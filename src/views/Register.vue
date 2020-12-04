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

      <h3 class="greeting">Welcome , Register</h3>

      <form
        class="login-form"
        method="POST"
        @submit.prevent="register"
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
            name="email"
            v-model="email"
            placeholder="Email"
            required
          />
          <small class="form-input-error" v-if="errors.email">
            {{ errors.email[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <input
            class="form-input"
            type="text"
            name="username"
            v-model="username"
            placeholder="Username"
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
            name="password1"
            v-model="password1"
            placeholder="Password"
            required
          />
          <small class="form-input-error" v-if="errors.password1">
            {{ errors.password1[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <input
            class="form-input"
            type="password"
            name="password2"
            v-model="password2"
            placeholder="Re-Type password"
            required
          />
          <small class="form-input-error" v-if="errors.password2">
            {{ errors.password2[0] }}
          </small>
        </div>

        <div class="form-group submit">
          <button class="submit-btn" type="submit" :disabled="loading">
            <div class="loader" v-if="loading"></div>
            <template>Register</template>
          </button>
        </div>

        <div class="form-group forgot-password-link">
          <hr />
          <a href="password/reset">forgot your password ?</a>
          <hr />
        </div>

        <div class="form-group submit">
          <a class="submit-btn" href="/login">Login</a>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: "",
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
    register() {
      this.loading = true;
      this.$store
        .dispatch("auth/register", {
          username: this.username,
          email: this.email,
          password1: this.password1,
          password2: this.password2
        })
        .catch(error => {
          this.errors = error.response.data || {};
          this.errors.username = error.response.data.username || null;
          this.errors.email = error.response.data.email || null;
          this.errors.password1 = error.response.data.password1 || null;
          this.errors.password2 = error.response.data.password2 || null;
          if (error.response.data.non_field_errors != null) {
            this.errors.password1 = error.response.data.non_field_errors;
          }

          this.$store.commit(
            "showAlert",
            {
              message: error.response.data.message || "Registration Failed",
              status: "error"
            },
            { root: true }
          );
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

<style lang="scss">
@import "@/scss/login";
</style>
