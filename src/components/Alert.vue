<template>
  <div
    v-if="display"
    class="alert-notification dismissable animated bounceInRight"
    :class="alertClass"
    role="alert"
  >
    <span v-html="message"></span>
    <button
      type="button"
      aria-label="Close"
      v-if="dismissable"
      @click="alertClosed"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    display() {
      return this.$store.state.alert != null;
    },
    status() {
      return this.$store.state.alert.status || "";
    },
    message() {
      return this.$store.state.alert.message || "";
    },
    dismissable() {
      return this.$store.state.alert.dismissable || true;
    },
    alertClass() {
      if (status == "error") return "danger";
      return this.status;
    }
  },

  methods: {
    alertClosed() {
      this.$store.commit("showAlert", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-notification {
  position: fixed;
  z-index: 1000;
  top: 90px;
  right: 20px;
  min-width: 250px;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  font-weight: bold;

  &.success {
    background-color: #4caf50;
  }

  &.danger {
    background-color: #f44336;
  }

  &.info {
    background-color: #9c27b0;
  }

  span {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  &.dismissable {
    button {
      flex-basis: 30px;
      flex-shrink: 1;
      background: none;
      border: 0;
      outline: 0;
      color: white;
      font-weight: bold;
      font-size: 24px;
      opacity: 0.5;
    }
  }
}
</style>
