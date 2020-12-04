<template>
  <div class="profile-page">
    <header>
      <main>
        <div class="image">
          <img src="user.png" alt="" />
        </div>
        <div class="title">
          <h3>{{ "Full Name" }}</h3>
          <p>Professional Geoscientist</p>
        </div>
        <div class="actions">
          <button type="button" class="bg-blue text-white">Edit Profile</button>
        </div>
      </main>
    </header>

    <section class="stats">
      <div class="stat">
        <p class="stat-value text-blue">250</p>
        <p class="stat-title">Posts</p>
      </div>
      <div class="stat">
        <p class="stat-value text-blue">14.1k</p>
        <p class="stat-title">Follower</p>
      </div>
      <div class="stat">
        <p class="stat-value text-blue">349</p>
        <p class="stat-title">Follwoing</p>
      </div>
    </section>

    <section class="info">
      <div class="bio">
        <p class="title">Works at</p>
        <p class="content">AIT Tv</p>
      </div>
      <div class="bio">
        <p class="title">Studied at</p>
        <p class="content">Cranford University</p>
      </div>
      <div class="bio">
        <p class="title">Martital Status</p>
        <p class="content">Divorced</p>
      </div>
      <div class="bio">
        <p class="title">See</p>
        <p class="content">Conatct info</p>
      </div>
    </section>

    <section class="about">
      <h3>About</h3>
      <p>
        Some time ago I worked on a new feature: sending images in the app’s
        internal chat. The feature itself was big and included multiple Some
        time ago I worked on a new feature: sending images in the app’s internal
        chat. The feature itself was big and included multipleSome time ago I
        worked on a new feature: sending images in the app’s internal chat. The
        feature itself was big and included multiple
      </p>
    </section>

    <section class="activities-section">
      <h3>Activities</h3>
      <div class="activities">
        <div class="activity">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            error?
          </p>
        </div>
        <div class="activity">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            error?
          </p>
        </div>
        <div class="activity">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            error?
          </p>
        </div>
        <div class="activity">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            error?
          </p>
        </div>
        <div class="activity">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur,
            error?
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Profile",

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    posts() {
      return [];
    },
    follower() {
      return [];
    },
    following() {
      return [];
    }
  },

  methods: {}
};
</script>
