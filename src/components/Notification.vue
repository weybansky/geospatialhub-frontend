<template>
  <!-- @click="$router.push('/users/' + notification.id)" -->
  <div class="notification" :class="{ read: read }" @click="action">
    <template v-if="type == 'new_course'">
      <div class="image">
        <!-- <img :src="follower.profile_pic || 'user.png'" alt="Profile Picture" /> -->
      </div>
      <div class="text">You just enrolled for {{ course.title }}</div>
      <div class="time">{{ postedAt }}</div>
    </template>
    <template v-if="type == 'new_follower'">
      <div class="image">
        <img :src="follower.profile_pic || 'user.png'" alt="Profile Picture" />
      </div>
      <div class="text">@{{ follower.username }} followed you</div>
      <div class="time">{{ postedAt }}</div>
    </template>
    <template v-if="type == 'unenrolled_course'">
      <div class="image">
        <!-- <img :src="follower.profile_pic || 'user.png'" alt="Profile Picture" /> -->
      </div>
      <div class="text">You just enrolled for {{ course.title }}</div>
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
    action() {
      if (this.type == "new_course") {
        this.$router.push("/courses/" + this.course.id);
      } else if (this.type == "new_follower") {
        this.$router.push("/users/" + this.follower.id);
      } else if (this.type == "unenrolled_course") {
        this.$router.push("/courses/" + this.course.id);
      } else {
        //
      }
    }
  }
};
</script>
