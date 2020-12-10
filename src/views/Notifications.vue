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
      <div class="notification">
        <div class="text text-center">0 New Notifications</div>
      </div>
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
      return this.$store.state.auth.notifications.new_follower || [];
    }
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["users", "chats"]);
    this.$store.dispatch("auth/getNotifications");
  }
};
</script>
