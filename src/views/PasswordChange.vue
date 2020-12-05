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
            name="new_password1"
            v-model="new_password1"
            placeholder="Password"
            required
            @focus="clearAlert"
          />
          <small class="form-input-error" v-if="errors.new_password1">
            {{ errors.new_password1[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <input
            class="form-input"
            type="password"
            name="new_password2"
            v-model="new_password2"
            placeholder="Re-type Password"
            required
            @focus="clearAlert"
          />
          <small class="form-input-error" v-if="errors.new_password2">
            {{ errors.new_password2[0] }}
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
      new_password1: "GeoHub1234",
      new_password2: "GeoHub1234",
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
    },
    token() {
      return this.$route.params.token;
    },
    uid() {
      return this.$route.params.uid;
    }
  },

  methods: {
    resetPassword() {
      if (this.new_password1 !== this.new_password2) {
        this.errors.new_password1 = ["Password must be the same"];
        this.errors.new_password2 = ["Password must be the same"];
        this.$store.commit("showAlert", {
          message: "Password does not match",
          status: "error"
        });
      } else {
        this.loading = true;
        this.$store
          .dispatch("auth/changePassword", {
            new_password1: this.new_password1,
            new_password2: this.new_password2,
            uid: this.uid,
            token: this.token
          })
          .then(() => {
            this.errors = {};
            this.new_password1 = this.new_password2 = "";
            this.$store.commit("showAlert", {
              message: "Password Changed",
              status: "success"
            });
          })
          .catch(({ response }) => {
            let message = "Failed";
            this.errors = response.data || {};
            this.errors.new_password1 = response.data.new_password1 || null;
            this.errors.new_password2 = response.data.new_password2 || null;

            if (
              response.data.token != null ||
              response.data.non_field_errors != null
            ) {
              message =
                "Invalid/Expired reset link. You should request a new one";
            }

            this.$store.commit("showAlert", {
              message: response.data.message || message,
              status: "error"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    verifyLink() {
      //
    },

    handleFormError(field) {
      delete this.errors[field];
    },

    clearAlert() {
      if (this.alertShow) {
        this.$store.commit("showAlert", null);
      }
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
