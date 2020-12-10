<template>
  <div class="chat" ref="chat">
    <div class="image" @click="$router.push('/users/' + chat.sender.id)">
      <img :src="chat.sender.profile_pic || '/user.png'" alt="" />
    </div>
    <div class="details">
      <p class="name">
        {{ chat.sender.first_name + " " + chat.sender.last_name }}
        <small>@{{ chat.sender.username }}</small>
      </p>
      <div class="text" v-html="chat.body"></div>
      <p class="date-time">{{ fromNow }}</p>
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
        return {};
      }
    }
  },

  computed: {
    fromNow() {
      return moment(this.chat.created).fromNow();
    }
  },

  mounted() {
    this.$refs.chat.scrollIntoView();
  }
};
</script>
