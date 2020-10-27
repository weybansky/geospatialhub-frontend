<template>
  <div class="register">
    <div class="menu">
      <div class="brand">
        <img class="logo" src="@/assets/logo.png" alt="Logo" />
        <span class="brand-name">
          Geo<span class="text-primary">Science</span>
        </span>
      </div>
      <div class="link">
        <span class="text">Already have an Account?</span>
        <router-link class="button" to="/login">Sign in</router-link>
      </div>
    </div>

    <div class="left">
      <!--  -->
    </div>

    <div class="right">
      <h3 class="greeting text-primary">Welcome</h3>
      <form class="register-form" method="POST" @submit.prevent="register">
        <div
          class="form-group form-alert"
          v-if="alertShow"
          :class="alertStatus"
        >
          <small>{{ alertMessage }}</small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['fas', 'envelope']"
            class="form-icon text-primary"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="email"
            name="email"
            v-model="email"
            placeholder="Email"
          />
          <small class="form-input-error" v-if="errors.email">
            {{ errors.email[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['fas', 'user']"
            class="form-icon text-primary"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="text"
            name="username"
            v-model="username"
            placeholder="Username"
          />
          <small class="form-input-error" v-if="errors.username">
            {{ errors.username[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            class="form-icon text-primary"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="password"
            name="password1"
            v-model="password1"
            placeholder="Password"
          />
          <small class="form-input-error" v-if="errors.password1">
            {{ errors.password1[0] }}
          </small>
        </div>

        <div class="form-group input-group">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            class="form-icon text-primary"
          ></font-awesome-icon>
          <input
            class="form-input"
            type="password"
            name="password2"
            v-model="password2"
            placeholder="ReType Password"
          />
          <small class="form-input-error" v-if="errors.password2">
            {{ errors.password2[0] }}
          </small>
        </div>

        <div class="form-group submit">
          <button class="submit-btn" type="submit">
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
export default {
  name: "Register",

  data() {
    return {
      username: "",
      email: "",
      password1: "",
      password2: "",
      // username: "weybansky",
      // email: "weybansky@gmail.com",
      // password1: "Wt1234@,.",
      // password2: "Wt1234@,.",
      errors: {}
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
      this.$store
        .dispatch("auth/register", {
          username: this.username,
          email: this.email,
          password1: this.password1,
          password2: this.password2
        })
        .then(response => {
          localStorage.setItem("token", response.data.key);
          this.$store.commit("auth/setUser", response.data.user);
          this.$store.commit(
            "showAlert",
            {
              message: "Registration Successful",
              status: "success"
            },
            { root: true }
          );
          this.$router.push("/");
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
        });
    }
  }
};
</script>

<style lang="scss">
$primary-color: #0e67ec;
$danger-color: #f44336;
$success-color: #4caf50;
$secondary-color: #000000;

* {
  padding: 0;
  margin: 0;
}

.text-primary {
  color: $primary-color;
}
.text-primary {
  color: $primary-color;
}
.text-secondary {
  color: $primary-color;
}

.register {
  display: flex;
  height: 100vh;

  .menu {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    display: flex;
    padding: 5px 15px;
    height: 50px;

    .brand {
      flex: 1;
      display: flex;
      align-items: center;

      .logo {
        height: 40px;
        width: 40px;
      }
      .brand-name {
        padding-left: 10px;
        font-size: 18px;
      }
    }

    .link {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .text {
        margin-right: 10px;
      }

      .button {
        background-color: $primary-color;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 5px;
        border: 0;
        outline: 0;
      }
    }
  }

  .left {
    flex: 1;
    background: url("../assets/left_banner.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 40px;

    .greeting {
      font-size: 32px;
    }

    .register-form {
      .form-group {
        margin: 25px 0;

        &.form-alert {
          text-align: center;
          padding: 10px;
          border-radius: 5px;
          color: #ffffff;
          background-color: $primary-color;

          &.success {
            background-color: $success-color;
          }
          &.danger {
            background-color: $danger-color;
          }
        }

        &.input-group {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          position: relative;

          .form-icon {
            position: absolute;
            left: 1px;
            top: 10px;
          }

          .form-input {
            flex: 0 1 100%;
            border: 0;
            border-bottom: 1px solid $primary-color;
            padding: 10px;
            padding-left: 40px;
            outline: 0;

            &:focus {
              border-color: $secondary-color;
              border-radius: 5px;
            }
          }

          .form-input-error {
            padding: 10px 0 0 40px;
            flex: 0 1 100%;
            font-size: 12px;
            color: $danger-color;
          }
        }

        &.submit {
          // text-align: center;
          text-align: right;
          .submit-btn {
            background: linear-gradient(
              90deg,
              $primary-color,
              $secondary-color
            );
            color: #ffffff;
            border: 0;
            outline: 0;
            padding: 15px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
