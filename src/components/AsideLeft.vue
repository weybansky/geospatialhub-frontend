<template>
  <aside class="aside-left">
    <div class="branding">
      <img class="logo" src="../assets/logo.png" alt="Logo" />
    </div>

    <div class="user">
      <img class="image" src="../assets/user.png" alt="" />
      <h3 class="user-name">Samad Bashir</h3>
      <p class="user-title">Sr. Geoscientist</p>
    </div>

    <navigation></navigation>
  </aside>
</template>

<script>
import navigation from "../components/Navigation";

export default {
  name: "AsideLeft",

  components: {
    navigation
  }
};
</script>
