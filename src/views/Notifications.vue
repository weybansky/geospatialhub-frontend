<template>
  <section class="notifications-page">
    <div class="page-title">
      <h1 class="title">Notifications</h1>
      <p>
        <small>{{ notificationUnreadCount }} unread notifications</small>
      </p>
    </div>

    <div class="notifications" v-if="notifications.length">
      <div
        v-if="messageUnreadCount"
        class="notification"
        @click="$router.push('/chats')"
      >
        <div class="image">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="envelope"
            class="image"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
            ></path>
          </svg>
        </div>
        <div class="text">
          You {{ messageUnreadCount }} have unread messages
        </div>
        <div class="time">see them..</div>
      </div>

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
    },
    messageUnreadCount() {
      return this.$store.state.auth.notification.unread_message_count;
    }
  },

  async mounted() {
    this.$store.commit("setSidebarComponents", ["chats"]);
    await this.$store.dispatch("auth/getNotifications");
    this.$store.commit("auth/setNotificationConfig", {
      unread_notifications_count: 0
    });
    setTimeout(() => {
      const unreadNotifications = this.notifications
        .slice()
        .filter(notification => !notification.is_read);
      unreadNotifications.forEach(notification => {
        this.$store.dispatch("auth/markNotification", notification.id);
      });
    }, 3000);
  }
};
</script>
