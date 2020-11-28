<template>
  <section class="notifications-page">
    <div class="page-title">
      <h1 class="title">Notifications</h1>
    </div>

    <div class="notifications" v-if="notifications.length">
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>

    <div class="notifications" v-else>
      <div class="notification"></div>
    </div>
  </section>
</template>

<script>
import Notification from "@/components/Notification";

export default {
  name: "Notifications",

  components: {
    Notification
  },

  computed: {
    notifications() {
      return [
        {
          id: 1
          // text: "Lara has invited you to the group called geonation",
          // pubdate: "2020-11-08T10:34:00.270289Z"
        }
      ];
      // return this.$store.state.auth.notifications;
    }
  },

  mounted() {
    this.$store.dispatch("auth/getNotifications");
  }
};
</script>
