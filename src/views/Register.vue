<template>
  <div class="login register">
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
        <span class="text">Already have an Account?</span>
        <router-link class="button" to="/login">Sign in</router-link>
      </div>
    </div>

    <div class="left">
      <!--  -->
    </div>

    <div class="right">
      <h3 class="greeting text-blue">Welcome</h3>
      <form
        class="login-form register-form"
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
          <font-awesome-icon
            :icon="['far', 'envelope']"
            class="form-icon text-blue"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="email"
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
          <font-awesome-icon
            :icon="['far', 'user']"
            class="form-icon text-blue"
          ></font-awesome-icon>
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
          <font-awesome-icon
            :icon="['fas', 'lock']"
            class="form-icon text-blue"
          ></font-awesome-icon>
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
          <font-awesome-icon
            :icon="['fas', 'lock']"
            class="form-icon text-blue"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="password"
            name="password2"
            v-model="password2"
            placeholder="ReType Password"
            required
          />
          <small class="form-input-error" v-if="errors.password2">
            {{ errors.password2[0] }}
          </small>
        </div>

        <div class="form-group submit">
          <div class="loader" v-if="loading"></div>
          <button class="submit-btn" type="submit" :disabled="loading">
            <font-awesome-icon
              :icon="['fas', 'arrow-right']"
              class="form-icon"
            ></font-awesome-icon>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faUser, faLock, faArrowRight);

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

.register {
  .right {
    .register-form {
      .form-group {
        &.submit {
          text-align: right;
          .submit-btn {
            padding: 15px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: $color-blue;
          }
        }
      }
    }
  }
}
</style>
