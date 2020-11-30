<template>
  <div class="new-post">
    <textarea
      type="text"
      class="input"
      v-model="text"
      placeholder="Share your thoughts here..."
      :disabled="loading"
      required
    ></textarea>

    <img
      :src="profileImage"
      alt="Profile Image"
      class="profile-image"
      @click="$router.push('profile')"
    />

    <label
      for="post-image"
      title="Add Image"
      class="add-image-button"
      :class="{ selected: fileSelected }"
    >
      <svg
        class="icon"
        width="45"
        height="41"
        viewBox="0 0 45 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M39.3806 3.625H5.63062C4.88469 3.625 4.16932 3.92132 3.64188 4.44876C3.11443 4.97621 2.81812 5.69158 2.81812 6.4375V34.5625C2.81812 35.3084 3.11443 36.0238 3.64188 36.5512C4.16932 37.0787 4.88469 37.375 5.63062 37.375H39.3806C40.1265 37.375 40.8419 37.0787 41.3694 36.5512C41.8968 36.0238 42.1931 35.3084 42.1931 34.5625V6.4375C42.1931 5.69158 41.8968 4.97621 41.3694 4.44876C40.8419 3.92132 40.1265 3.625 39.3806 3.625ZM5.63062 0.8125C4.13877 0.8125 2.70803 1.40513 1.65314 2.46002C0.598248 3.51492 0.00561523 4.94566 0.00561523 6.4375V34.5625C0.00561523 36.0543 0.598248 37.4851 1.65314 38.54C2.70803 39.5949 4.13877 40.1875 5.63062 40.1875H39.3806C40.1193 40.1875 40.8508 40.042 41.5332 39.7593C42.2157 39.4766 42.8358 39.0623 43.3581 38.54C43.8804 38.0176 44.2948 37.3975 44.5774 36.7151C44.8601 36.0326 45.0056 35.3012 45.0056 34.5625V6.4375C45.0056 4.94566 44.413 3.51492 43.3581 2.46002C42.3032 1.40513 40.8725 0.8125 39.3806 0.8125H5.63062Z"
          fill="currentColor"
        />
        <path
          d="M29.9475 19.5042C30.1564 19.2959 30.4255 19.1586 30.7167 19.1117C31.0079 19.0647 31.3066 19.1106 31.5703 19.2427L42.1931 24.7186V37.3749H2.81812V31.7499L10.26 25.1292C10.4899 24.9002 10.7919 24.7577 11.1148 24.7259C11.4378 24.6942 11.7618 24.775 12.0319 24.9549L19.5131 29.9414L29.9475 19.5071V19.5042Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.6619 17.6875C13.2159 17.6875 13.7645 17.5784 14.2763 17.3664C14.7882 17.1544 15.2532 16.8436 15.645 16.4519C16.0367 16.0601 16.3475 15.595 16.5595 15.0832C16.7715 14.5714 16.8806 14.0228 16.8806 13.4688C16.8806 12.9147 16.7715 12.3661 16.5595 11.8543C16.3475 11.3425 16.0367 10.8774 15.645 10.4856C15.2532 10.0939 14.7882 9.78314 14.2763 9.57113C13.7645 9.35912 13.2159 9.25 12.6619 9.25C11.543 9.25 10.4699 9.69447 9.67876 10.4856C8.88759 11.2768 8.44312 12.3499 8.44312 13.4688C8.44312 14.5876 8.88759 15.6607 9.67876 16.4519C10.4699 17.243 11.543 17.6875 12.6619 17.6875Z"
          fill="currentColor"
        />
      </svg>
      <input
        type="file"
        id="post-image"
        ref="image"
        style="display: none"
        accept="image/*"
        @change="fileSelect"
      />
    </label>

    <button
      title="Create"
      class="send-button"
      @click="createPost"
      :disabled="loading"
    >
      <svg
        class="icon"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.2969 0.703101C37.0861 0.493215 36.8197 0.347898 36.529 0.284236C36.2384 0.220574 35.9356 0.241212 35.6563 0.343726L1.28131 12.8437C0.984856 12.9562 0.729625 13.1561 0.549517 13.4171C0.369409 13.678 0.272949 13.9876 0.272949 14.3047C0.272949 14.6217 0.369409 14.9313 0.549517 15.1922C0.729625 15.4532 0.984856 15.6532 1.28131 15.7656L16.2813 21.7656L22.2813 36.7656C22.394 37.049 22.5873 37.2933 22.8372 37.4682C23.087 37.6431 23.3827 37.7411 23.6876 37.75C24.0033 37.7435 24.3097 37.6415 24.5663 37.4574C24.8229 37.2733 25.0177 37.0158 25.1251 36.7187L37.6251 2.34373C37.7315 2.06728 37.7572 1.76627 37.6991 1.47579C37.641 1.18531 37.5015 0.917335 37.2969 0.703101ZM23.6876 31.8125L19.3282 20.875L26.8126 13.3906L24.6094 11.1875L17.0626 18.7343L6.18756 14.3125L33.5782 4.42185L23.6876 31.8125Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <span class="error" v-if="errors.text">{{ errors.text[0] }}</span>
    <span class="error" v-if="errors.image">{{ errors.image[0] }}</span>

    <LoadSpinner :loading="loading" />
  </div>
</template>

<script>
import LoadSpinner from "@/components/LoadSpinner";

export default {
  name: "CreateNewPost",

  components: {
    LoadSpinner
  },

  data() {
    return {
      text: "",
      fileSelected: false,
      errors: {},
      loading: false
    };
  },

  computed: {
    profileImage() {
      return this.$store.state.auth.user.profile.profile_pic || "user.png";
    }
  },

  methods: {
    createPost() {
      let formData = new FormData();
      formData.append("text", this.text);
      if (this.$refs.image.files.length) {
        formData.append("image", this.$refs.image.files[0]);
      }
      this.loading = true;
      this.$store
        .dispatch("post/createPost", formData)
        .then(() => {
          this.text = "";
          this.$refs.image.value = "";
        })
        .catch(({ response }) => {
          this.errors = response.data;
          if (this.$refs.image.files.length) {
            this.errors.text = ["A description of the image would be nice."];
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    fileSelect(e) {
      this.fileSelected = e.target.files.length ? true : false;
    }
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
.error {
  order: 10;
  font-size: 14px;
  color: red;
  padding: 7px 1rem;
  flex: 100%;
  text-align: center;
}
</style>
