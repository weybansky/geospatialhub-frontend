<template>
  <aside class="aside-right">
    <div
      class="chats-component"
      v-if="isActive('chats')"
      :style="{ order: order('chats') }"
    >
      <h3 class="title">Chats</h3>
      <div class="chats">
        <div v-for="chat in chats" :key="chat.id">
          {{ chat }}
        </div>
      </div>
      <router-link to="/chats" class="footer">
        See all chats...
      </router-link>
    </div>

    <div
      class="users-component"
      v-if="isActive('users')"
      :style="{ order: order('users') }"
    >
      <h3 class="title">People</h3>
      <div class="users">
        <UserCard
          class="user"
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
      <router-link to="/users" class="footer">
        See all people...
      </router-link>
    </div>

    <div
      class="courses-component"
      v-if="isActive('courses')"
      :style="{ order: order('courses') }"
    >
      <h3 class="title">Courses</h3>
      <div class="courses">
        <div v-for="course in courses" :key="course.id">
          {{ course }}
        </div>
      </div>
      <router-link to="/courses" class="footer">
        See all Courses...
      </router-link>
    </div>
  </aside>
</template>

<script>
import UserCard from "./UserCard.vue";
// import courses from "../components/SideBarCourses";

export default {
  name: "AsideRight",

  components: { UserCard },

  computed: {
    layoutOrder() {
      return this.$store.state.layout.components;
    },
    user() {
      return this.$store.state.auth.user || { profile: {} };
    },
    chats() {
      return this.$store.getters["auth/sortChats"];
    },
    users() {
      return this.$store.state.user.search.users || [];
    },
    courses() {
      return this.$store.state.course.courses;
    }
  },

  methods: {
    isActive(component) {
      return this.layoutOrder.includes(component);
    },
    order(component) {
      return this.layoutOrder.indexOf(component) + 1;
    }
  }
};
</script>
