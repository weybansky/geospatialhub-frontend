<template>
  <div class="message" :class="{ received }" ref="message">
    <p class="text" v-html="this.message.text"></p>
    <p class="date-time">{{ dateTime }}</p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Message",

  props: {
    message: {
      type: Object,
      required: true,
      default: () => {
        return {
          sender: { id: "4", username: "weybansky" },
          text: "Hi, I'm Abdulwahab",
          receiver: { id: "5", username: "johndoe" },
          created: "2020-12-07T09:04:32.696766Z",
          is_read: true
        };
      }
    }
  },

  computed: {
    sender() {
      return this.$store.state.auth.user;
    },
    receiver() {
      return this.$store.state.user.user;
    },
    received() {
      // message receiver == auth user (sender)
      return this.message.receiver.id == this.sender.id;
    },
    dateTime() {
      return moment(this.message.created).fromNow();
    }
  },

  mounted() {
    this.$refs.message.scrollIntoView();
  }
};
</script>
