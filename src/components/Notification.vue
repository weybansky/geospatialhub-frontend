<template>
  <!-- @click="$router.push('/users/' + notification.id)" -->
  <div class="notification" :class="{ unread: unread }">
    <div class="image">
      <img
        :src="notification.profile_pic || 'user.png'"
        alt="Profile Picture"
      />
    </div>
    <div class="text">@{{ notification.username }} followed you</div>
    <div class="time">{{ postedAt }}</div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Notification",

  data() {
    return {
      unread: false
    };
  },

  props: {
    notification: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: 3,
          username: "thor04",
          first_name: "",
          last_name: "",
          profile_pic: null,
          created: "2020-11-29T19:07:51.834493Z"
        };
      }
    }
  },

  computed: {
    postedAt() {
      return moment(this.notification.created).fromNow();
    }
  },

  methods: {},

  mounted() {}
};
</script>
