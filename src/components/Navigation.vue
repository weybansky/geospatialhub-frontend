<template>
  <nav class="navigation">
    <router-link to="/" class="nav-link" exact>
      <div class="nav-link-icon">
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="icon"
        ></font-awesome-icon>
      </div>
      <span class="text">Home</span>
    </router-link>

    <router-link to="/courses" class="nav-link">
      <div class="nav-link-icon">
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="icon"
        ></font-awesome-icon>
      </div>
      <span class="text">Courses</span>
    </router-link>

    <router-link to="/notification" class="nav-link" exact>
      <div class="nav-link-icon">
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="icon"
        ></font-awesome-icon>
        <span class="notification-dot"></span>
      </div>
      <span class="text">Notification</span>
    </router-link>

    <router-link to="/about" class="nav-link" exact>
      <div class="nav-link-icon">
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="icon"
        ></font-awesome-icon>
      </div>
      <span class="text">About</span>
    </router-link>

    <router-link to="/contact" class="nav-link dropdown" exact>
      <div class="nav-link-icon">
        <font-awesome-icon
          :icon="['fas', 'home']"
          class="icon"
        ></font-awesome-icon>
      </div>
      <span class="text">Contact</span>

      <ul class="dropdown-menu">
        <li class="nav-link">
          <!-- <div class="nav-link-icon">
            <font-awesome-icon
              :icon="['fas', 'home']"
              class="icon"
            ></font-awesome-icon>
          </div> -->
          <span class="text">geospatialhub@gmail.com</span>
        </li>

        <li class="nav-link">
          <!-- <div class="nav-link-icon">
            <font-awesome-icon
              :icon="['fas', 'home']"
              class="icon"
            ></font-awesome-icon>
          </div> -->
          <span class="text">08012345678</span>
        </li>
      </ul>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
