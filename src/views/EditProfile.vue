<template>
  <div class="profile-page edit-profile-page page">
    <header :style="{ 'background-image': bannerImage }">
      <label for="banner_image" class="edit-image">
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
          ref="banner_image"
          id="banner_image"
          name="banner_image"
          accept="image/*"
          @change="previewImage('banner_image')"
        />
      </label>
      <main>
        <div class="image">
          <img :src="profileImage" alt="" />
          <label for="profile_image" class="edit-image">
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
              ref="profile_image"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              @change="previewImage('profile_image')"
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
        <LoadSpinner :loading="loadingUploading" />
        <div class="header">
          <p class="title">{{ newImage.title }}</p>
        </div>
        <div class="body">
          <p v-if="showUploadError" style="color:red">
            Failed!. Try again
          </p>
          <img :src="newImage.image" :alt="newImage.title" />
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
      <form
        action="POST"
        @submit.prevent="updateProfile"
        class="form"
        @keydown="handleFormError($event.target.name)"
      >
        <div class="form-group">
          <small class="form-input-error text-green" v-if="data.successMessage">
            {{ data.successMessage }}
          </small>
          <small class="form-input-error text-red" v-if="data.errorMessage">
            {{ data.errorMessage }}
          </small>
        </div>

        <div class="form-group">
          <label for="name">Name</label>
          <div class="input-group">
            <input
              class="input"
              type="text"
              name="first_name"
              placeholder="First Name"
              v-model="data.first_name"
              required
            />
            <input
              class="input"
              type="text"
              name="last_name"
              placeholder="Last Name"
              v-model="data.last_name"
              required
            />
          </div>
          <small class="form-input-error text-red" v-if="errors.first_name">
            {{ errors.first_name[0] }}
          </small>
          <small class="form-input-error text-red" v-if="errors.last_name">
            {{ errors.last_name[0] }}
          </small>
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
          <small class="form-input-error text-red" v-if="errors.phone">
            {{ errors.phone[0] }}
          </small>
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
          <small class="form-input-error text-red" v-if="errors.bio">
            {{ errors.bio[0] }}
          </small>
        </div>

        <div class="form-group">
          <label for="dob">Date Of Birth</label>
          <input
            class="input"
            type="date"
            name="dob"
            placeholder="YYYY-MM-DD"
            v-model="data.dob"
          />
          <small class="form-input-error text-red" v-if="errors.date_of_birth">
            {{ errors.date_of_birth[0] }}
          </small>
        </div>

        <div class="form-group">
          <label for="location_country">Country</label>
          <select
            class="input"
            name="location_country"
            id="location_country"
            v-model="data.location_country"
          >
            <option value="">Select your Country</option>
            <option
              v-for="(c, index) in countries"
              :key="index"
              :value="c.country"
              v-html="c.country"
            ></option>
          </select>
          <small
            class="form-input-error text-red"
            v-if="errors.location_country"
          >
            {{ errors.location_country[0] }}
          </small>
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <div class="input-group">
            <select
              class="input"
              name="location_state"
              id="location_state"
              v-model="data.location_state"
            >
              <option value="">Select City</option>
              <option
                v-for="(state, index) in states"
                :key="index"
                :value="state"
                v-html="state"
              ></option>
            </select>

            <input
              class="input"
              v-model="data.location_city"
              type="text"
              name="location_city"
              placeholder="City"
            />
          </div>
          <small class="form-input-error text-red" v-if="errors.location_state">
            {{ errors.location_state[0] }}
          </small>
          <small class="form-input-error text-red" v-if="errors.location_city">
            {{ errors.location_city[0] }}
          </small>
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
          <small class="form-input-error text-red" v-if="errors.occupation">
            {{ errors.occupation[0] }}
          </small>
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
          <small class="form-input-error text-red" v-if="errors.organisation">
            {{ errors.organisation[0] }}
          </small>
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
          <small class="form-input-error text-red" v-if="errors.institution">
            {{ errors.institution[0] }}
          </small>
        </div>

        <div class="form-group">
          <small class="form-input-error text-green" v-if="data.successMessage">
            {{ data.successMessage }}
          </small>
          <small class="form-input-error text-red" v-if="data.errorMessage">
            {{ data.errorMessage }}
          </small>
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

    <section class="about password">
      <h3>Change Password</h3>
      <form
        action="POST"
        @submit.prevent="changePassword"
        class="form"
        @keydown="handleFormError($event.target.name)"
      >
        <div class="form-group">
          <small class="form-input-error text-green">
            {{ password.successMessage }}
          </small>
          <small class="form-input-error text-red">
            {{ password.errorMessage }}
          </small>
        </div>

        <div class="form-group">
          <label for="new_password1">New Password</label>
          <input
            class="input"
            type="password"
            name="new_password1"
            placeholder="******"
            v-model="password.new_password1"
          />
          <small class="form-input-error text-red" v-if="errors.new_password1">
            {{ errors.new_password1[0] }}
          </small>
        </div>
        <div class="form-group">
          <label for="new_password2">Confirm Password</label>
          <input
            class="input"
            type="password"
            name="new_password2"
            placeholder="******"
            v-model="password.new_password2"
          />
          <small class="form-input-error text-red" v-if="errors.new_password2">
            {{ errors.new_password2[0] }}
          </small>
        </div>

        <div class="form-group">
          <div class="input-group">
            <button type="reset" class="input bg-white text-blue">
              Reset
            </button>
            <button type="submit" class="input bg-blue text-white">
              Change
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";
import moment from "moment";

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
        dob: "",
        location_country: "",
        location_state: "",
        location_city: "",
        occupation: "",
        organisation: "",
        institution: "",
        successMessage: "",
        errorMessage: ""
      },
      password: {
        new_password1: "",
        new_password2: "",
        successMessage: "",
        errorMessage: ""
      },
      loading: false,
      loadingUploading: false,
      showUploadError: false,
      errors: {},
      countries: []
    };
  },

  computed: {
    dob() {
      if (moment(this.data.dob).isValid()) {
        return moment(this.data.dob).format("YYYY-MM-DD");
      } else {
        return null;
      }
    },
    user() {
      return this.$store.state.auth.user;
    },
    profileImage() {
      return this.user.profile.profile_pic || "/user.png";
    },
    bannerImage() {
      const image = this.user.profile.banner_pic || null;
      return `url(${image})`;
    },
    states() {
      let country = this.countries.filter(
        c => c.country == this.data.location_country
      );
      if (!country.length) return [];

      return country[0].states || [];
    }
  },

  async mounted() {
    await this.$store.dispatch("auth/getUser").then(() => {
      this.setData();
    });
    this.loadCountries();
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
      this.data.successMessage = "";
      this.data.errorMessage = "";
      this.$store
        .dispatch("auth/updateUser", { ...this.data, date_of_birth: this.dob })
        .then(() => {
          this.data.successMessage = "Profile Updated successfully";
        })
        .catch(({ response }) => {
          this.errors = response.data || {};
          this.data.errorMessage =
            "Something went wrong. Double check all field";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    previewImage(title) {
      this.showImage = true;
      let input = null;

      if (title == "profile_image") {
        this.newImage.title = "Profile Image";
        input = this.$refs.profile_image;
      } else {
        this.newImage.title = "Banner Image";
        input = this.$refs.banner_image;
      }

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        const vue = this;
        reader.onload = function(e) {
          vue.newImage.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    cancelUpload() {
      this.showImage = false;
    },
    uploadImage() {
      let formData = new FormData();

      if (this.newImage.title == "Profile Image") {
        const profile_pic = this.$refs.profile_image;
        if (profile_pic.files.length) {
          formData.append("profile_pic", profile_pic.files[0]);
        }
      } else {
        const banner_pic = this.$refs.banner_image;
        if (banner_pic.files.length) {
          formData.append("banner_pic", banner_pic.files[0]);
        }
      }

      this.loadingUploading = true;
      this.$store
        .dispatch("auth/updateUserImage", formData)
        .catch(() => {
          this.showUploadError = true;
        })
        .finally(() => {
          this.showUploadError = false;
          this.$refs.profile_image.value = "";
          this.$refs.banner_image.value = "";
          this.loadingUploading = false;
          this.newImage.title = "";
          this.newImage.image = null;
          this.showImage = false;
        });
    },
    async loadCountries() {
      await this.$store
        .dispatch("auth/getCountries")
        .then(data => {
          this.countries = data;
        })
        .catch(() => {
          this.countries = [];
        });
    },
    changePassword() {
      this.loading = true;
      this.password.successMessage = "";
      this.password.errorMessage = "";
      this.$store
        .dispatch("auth/changePasswordFromProfile", {
          new_password1: this.password.new_password1,
          new_password2: this.password.new_password2
        })
        .then(({ data }) => {
          this.password.successMessage = data.detail;
          this.password.new_password1 = "";
          this.password.new_password2 = "";
        })
        .catch(({ response }) => {
          this.password.errorMessage = "Password change failed";
          this.errors = response.data || {};
          if (response.data.non_field_errors != null) {
            this.errors.new_password1 = response.data.non_field_errors;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleFormError(field) {
      delete this.errors[field];
    }
  }
};
</script>
