<template>
  <!-- @click="$router.push('/users/' + notification.id)" -->
  <div class="notification" :class="{ read: read }" @click="action">
    <template v-if="type == 'new_course'">
      <div class="image">
        <svg
          class="image"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 56.25H15C14.0057 56.249 13.0525 55.8536 12.3494 55.1506C11.6464 54.4475 11.251 53.4943 11.25 52.5V7.5C11.251 6.50574 11.6464 5.55249 12.3494 4.84945C13.0525 4.1464 14.0057 3.75099 15 3.75H45C45.9943 3.75099 46.9475 4.1464 47.6506 4.84945C48.3536 5.55249 48.749 6.50574 48.75 7.5V38.6587L39.375 33.9713L30 38.6587V7.5H15V52.5H45V45H48.75V52.5C48.7485 53.4941 48.3529 54.4471 47.65 55.15C46.9471 55.8529 45.9941 56.2485 45 56.25ZM39.375 29.7787L45 32.5912V7.5H33.75V32.5912L39.375 29.7787Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="text">
        You just enrolled for <span>{{ course.title }}</span>
      </div>
      <div class="time">{{ postedAt }}</div>
    </template>
    <template v-if="type == 'new_follower'">
      <div class="image">
        <img
          class="image"
          :src="follower.profile_pic || 'user.png'"
          alt="Profile Picture"
        />
      </div>
      <div class="text">
        <span>@{{ follower.username }}</span> followed you
      </div>
      <div class="time">{{ postedAt }}</div>
    </template>
    <template v-if="type == 'unenroll_course'">
      <div class="image">
        <svg
          class="image"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 56.25H15C14.0057 56.249 13.0525 55.8536 12.3494 55.1506C11.6464 54.4475 11.251 53.4943 11.25 52.5V7.5C11.251 6.50574 11.6464 5.55249 12.3494 4.84945C13.0525 4.1464 14.0057 3.75099 15 3.75H45C45.9943 3.75099 46.9475 4.1464 47.6506 4.84945C48.3536 5.55249 48.749 6.50574 48.75 7.5V38.6587L39.375 33.9713L30 38.6587V7.5H15V52.5H45V45H48.75V52.5C48.7485 53.4941 48.3529 54.4471 47.65 55.15C46.9471 55.8529 45.9941 56.2485 45 56.25ZM39.375 29.7787L45 32.5912V7.5H33.75V32.5912L39.375 29.7787Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="text">
        You just unenrolled from <span>{{ course.title }}</span>
      </div>
      <div class="time">{{ postedAt }}</div>
    </template>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Notification",

  props: {
    notification: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: null,
          event: null,
          follower: null,
          course: null,
          created: "2020-12-14T10:05:25.164998Z",
          is_read: false
        };
      }
    }
  },

  computed: {
    type() {
      return this.notification.event || null;
    },
    postedAt() {
      return moment(this.notification.created).fromNow();
    },
    read() {
      return this.notification.is_read || false;
    },
    course() {
      return this.notification.course || null;
    },
    follower() {
      return this.notification.follower || null;
    }
  },

  methods: {
    async action() {
      this.$store.dispatch("auth/markNotification", this.notification.id);

      if (this.type == "new_course") {
        this.$router.push("/courses/" + this.course.id);
      } else if (this.type == "new_follower") {
        this.$router.push("/users/" + this.follower.id);
      } else if (this.type == "unenroll_course") {
        this.$router.push("/courses/" + this.course.id);
      } else {
        //
      }
    }
  }
};
</script>
