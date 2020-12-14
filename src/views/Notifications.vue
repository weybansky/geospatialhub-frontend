<template>
  <section class="notifications-page">
    <div class="page-title">
      <h1 class="title">Notifications</h1>
      <p>
        <small>{{ notificationUnreadCount }} unread notifications</small>
      </p>
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
        <div class="text text-center">0 Notifications</div>
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
      return this.$store.getters["auth/sortNotifications"] || [];
    },
    notificationUnreadCount() {
      return this.$store.state.auth.notification.unread_notifications_count;
    }
  },

  mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    this.$store.dispatch("auth/getNotifications");
  }
};
</script>
