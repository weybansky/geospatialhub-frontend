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

      <h3 class="greeting">Reset your Password</h3>

      <form
        class="login-form"
        method="POST"
        @submit.prevent="resetPassword"
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
            type="email"
            name="email"
            v-model="email"
            placeholder="Email"
            required
            @focus="clearAlert"
          />
          <small class="form-input-error" v-if="errors.email">
            {{ errors.email[0] }}
          </small>
        </div>

        <div class="form-group submit">
          <button class="submit-btn" type="submit" :disabled="loading">
            <div class="loader" v-if="loading"></div>
            <template>Reset</template>
          </button>
        </div>

        <div class="form-group forgot-password-link">
          <hr />
          <a href="/login">Go back to login</a>
          <hr />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "PasswordForgot",

  data() {
    return {
      email: "",
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
    resetPassword() {
      this.loading = true;
      this.$store
        .dispatch("auth/sendResetEmail", { email: this.email })
        .then(() => {
          this.email = "";
          this.errors = {};
          this.$store.commit("showAlert", {
            message: "Please check your email for the reset link",
            status: "success"
          });
        })
        .catch(({ response }) => {
          this.errors = response.data || {};
          this.errors.email = response.data.email || "Something went wrong";

          if (response.data.non_field_errors != null) {
            this.errors.email = response.data.non_field_errors;
          }

          this.$store.commit("showAlert", {
            message: response.data.message || "Failed",
            status: "error"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleFormError(field) {
      delete this.errors[field];
    },

    clearAlert() {
      if (this.alertShow) {
        this.$store.commit("showAlert", null);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/login";
</style>
