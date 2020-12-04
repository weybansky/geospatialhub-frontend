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
        autocomplete="off"
        aria-autocomplete="off"
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
            placeholder="Re-type Password"
            required
          />
          <small class="form-input-error" v-if="errors.password2">
            {{ errors.password2[0] }}
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
  name: "PasswordChange",

  data() {
    return {
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
    resetPassword() {
      if (this.password1 !== this.password2) {
        this.errors.password2 = ["Password must be the same"];
        return false;
      }

      this.loading = true;
      this.$store
        .dispatch("auth/changePassword", {
          password1: this.password1,
          password2: this.password2
        })
        .then(() => {
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data || {};
          this.errors.password1 = response.data.password1 || null;
          this.errors.password2 = response.data.password2 || null;

          if (response.data.non_field_errors != null) {
            this.errors.password1 = response.data.non_field_errors;
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

    verifyLink() {
      //
    },

    handleFormError(field) {
      delete this.errors[field];
    }
  },

  created() {
    this.verifyLink();
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/login";
</style>
