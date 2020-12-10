<template>
  <div class="chat" :class="{ read }" @click="goToChat">
    <div class="image">
      <img :src="user.profile_pic || '/user.png'" alt="Profile Pic" />
    </div>
    <div class="details">
      <p class="name">{{ fullName }}</p>
      <p class="text" v-html="lastMessageBy + chat.text"></p>
      <p class="date-time">{{ dateTime }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Chat",

  props: {
    chat: {
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
      return this.chat.sender;
    },
    receiver() {
      return this.chat.receiver;
    },
    authUser() {
      return this.$store.state.auth.user;
    },
    user() {
      if (this.receiver.id == this.authUser.id) {
        return this.sender;
      }
      return this.receiver;
    },
    lastMessageBy() {
      if (this.receiver.id == this.authUser.id) {
        // return this.fullName
        return "";
      }
      return "You: ";
    },
    fullName() {
      const first_name = this.user.first_name || "";
      const last_name = this.user.last_name || "";
      return (first_name + " " + last_name).trim() || this.user.username;
    },
    dateTime() {
      return moment(this.chat.created).fromNow();
    },
    read() {
      return this.is_read;
    }
  },

  methods: {
    goToChat() {
      window.location.href = `/chats/${this.user.id}`;
    }
  }
};
</script>
