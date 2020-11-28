<template>
  <div class="notification" :class="{ unread: unread }">
    <div class="image">
      <img src="user.png" alt="Profile Picture" />
    </div>
    <div class="text">Lara has invited you to the group called geonation</div>
    <div class="time">2minutes ago</div>
  </div>
</template>

<script>
// import moment from "moment";

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
          // id: 5,
          //
          // type:"",
          // text: "New Post from weybansky on Nov. 8",
          // image: null,
          // pub_date: "2020-11-08T10:34:00.270289Z",
          // user:"",
          // message: "",
          // post:"",
        };
      }
    }
  },

  computed: {
    // postedAt() {
    //   return moment(this.post.pub_date).fromNow();
    // }
  },

  methods: {},

  mounted() {}
};
</script>
