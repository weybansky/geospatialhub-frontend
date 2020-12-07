<template>
  <div class="profile-page edit-profile-page">
    <header :style="{ 'background-image': bannerImage }">
      <label for="banner-image" class="edit-image">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="camera"
          class="icon"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
          ></path>
        </svg>
        <input
          class="input"
          type="file"
          ref="banner-image"
          id="banner-image"
          name="banner-image"
          accept="image/*"
        />
      </label>
      <main>
        <div class="image">
          <img :src="profileImage" alt="" />
          <label for="profile-image" class="edit-image">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="camera"
              class="icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
              ></path>
            </svg>
            <input
              class="input"
              type="file"
              ref="profile-image"
              id="profile-image"
              name="profile-image"
              accept="image/*"
            />
          </label>
        </div>
        <div class="title">
          <p>@{{ user.username }}</p>
        </div>
        <div class="actions">
          <button
            @click="updateProfile"
            type="button"
            class="bg-blue text-white"
          >
            Update
          </button>
        </div>
      </main>
    </header>

    <div class="show-image" v-if="showImage">
      <div class="card">
        <div class="header">
          <p class="title">{{ newImage.title }}</p>
        </div>
        <div class="body">
          <img src="/course_image.png" alt="" />
        </div>
        <div class="footer">
          <button
            type="button"
            class="bg-white text-blue"
            @click="cancelUpload"
          >
            Cancel
          </button>
          <button type="button" class="bg-blue text-white" @click="uploadImage">
            Upload
          </button>
        </div>
      </div>
    </div>

    <LoadSpinner :loading="loading" />

    <section class="about">
      <h3>Details</h3>
      <form action="POST" @submit.prevent="updateProfile" class="form">
        <div class="form-group">
          <label for="name">Name</label>
          <div class="input-group">
            <input
              class="input"
              type="text"
              name="first_name"
              placeholder="First Name"
              v-model="data.first_name"
            />
            <input
              class="input"
              type="text"
              name="last_name"
              placeholder="Last Name"
              v-model="data.last_name"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            class="input"
            type="text"
            name="phone"
            placeholder="+2348123456789"
            v-model="data.phone"
          />
        </div>

        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            class="input"
            rows="5"
            name="bio"
            placeholder="bio"
            v-model="data.bio"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="date_of_birth">DOB</label>
          <input
            class="input"
            type="text"
            name="date_of_birth"
            placeholder="YYYY-MM-DD"
            v-model="data.date_of_birth"
          />
        </div>

        <div class="form-group">
          <label for="location_country">Country</label>
          <input
            class="input"
            type="text"
            name="location_country"
            placeholder="location_country"
            v-model="data.location_country"
          />
        </div>

        <div class="form-group">
          <label for="location">Loaction</label>
          <div class="input-group">
            <input
              class="input"
              v-model="data.location_city"
              type="text"
              name="location_city"
              placeholder="location_city"
            />
            <input
              class="input"
              v-model="data.location_state"
              type="text"
              name="location_state"
              placeholder="location_state"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="occupation">Occupation</label>
          <input
            class="input"
            type="text"
            name="occupation"
            placeholder="occupation"
            v-model="data.occupation"
          />
        </div>
        <div class="form-group">
          <label for="organisation">Organization</label>
          <input
            class="input"
            type="text"
            name="organisation"
            placeholder="organisation"
            v-model="data.organisation"
          />
        </div>
        <div class="form-group">
          <label for="institution">Institution</label>
          <input
            class="input"
            type="text"
            name="institution"
            placeholder="institution"
            v-model="data.institution"
          />
        </div>

        <div class="form-group">
          <div class="input-group">
            <button
              @click="setData"
              type="button"
              class="input bg-white text-blue"
            >
              Reset
            </button>
            <button
              @click="updateProfile"
              type="button"
              class="input bg-blue text-white"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";

export default {
  name: "EditProfile",

  components: {
    LoadSpinner
  },

  data() {
    return {
      showImage: false,
      newImage: {
        title: "Profile Image",
        image: null
      },
      data: {
        first_name: "",
        last_name: "",
        phone: "",
        bio: "",
        date_of_birth: "",
        location_country: "",
        location_state: "",
        location_city: "",
        occupation: "",
        organisation: "",
        institution: ""
      },
      loading: false,
      errors: {}
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    profileImage() {
      return this.user.profile.profile_pic || "/user.png";
    },
    bannerImage() {
      const image = this.user.profile.banner_pic || null;
      return `url(${image})`;
    }
  },

  async mounted() {
    await this.$store.dispatch("auth/getUser").then(() => {
      this.setData();
    });
  },

  methods: {
    setData() {
      this.data.first_name = this.user.profile.first_name;
      this.data.last_name = this.user.profile.last_name;
      this.data.phone = this.user.profile.phone;
      this.data.bio = this.user.profile.bio;
      this.data.date_of_birth = this.user.profile.date_of_birth;
      this.data.location_country = this.user.profile.location_country;
      this.data.location_state = this.user.profile.location_state;
      this.data.location_city = this.user.profile.location_city;
      this.data.occupation = this.user.profile.occupation;
      this.data.organisation = this.user.profile.organisation;
      this.data.institution = this.user.profile.institution;
    },
    updateProfile() {
      this.loading = true;
      this.$store
        .dispatch("auth/updateUser", this.data)
        .then(() => {
          alert("success");
        })
        .catch(() => {
          alert("Failed");
        })
        .finally(() => {
          alert("Done");
          this.loading = false;
        });
    },
    cancelUpload() {},
    uploadImage() {}
  }
};
</script>
