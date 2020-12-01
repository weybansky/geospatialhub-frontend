<template>
  <div class="contact-page">
    <div class="page-title">
      <h1 class="title">Contact</h1>
      <p class="contact">
        <a class="option" :href="'mailto:' + email">
          <svg
            class="icon"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.6666 8.33301H12.4999C10.202 8.33301 8.33325 10.2018 8.33325 12.4997V22.9163H12.4999V16.6663L25.8333 26.6663C26.194 26.9365 26.6326 27.0825 27.0833 27.0825C27.5339 27.0825 27.9725 26.9365 28.3333 26.6663L41.6666 16.6663V35.4163H24.9999V39.583H41.6666C43.9645 39.583 45.8333 37.7143 45.8333 35.4163V12.4997C45.8333 10.2018 43.9645 8.33301 41.6666 8.33301ZM27.0833 22.3955L13.8874 12.4997H40.2791L27.0833 22.3955Z"
              fill="currentColor"
            />
            <path
              d="M4.16675 25H18.7501V29.1667H4.16675V25ZM8.33341 31.25H20.8334V35.4167H8.33341V31.25ZM14.5834 37.5H22.9167V41.6667H14.5834V37.5Z"
              fill="currentColor"
            />
          </svg>
          {{ email }}
        </a>
        <a class="option" :href="'tel:' + phone">
          <svg
            class="icon"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.6875 32.0417C39.125 32.0417 36.6458 31.625 34.3333 30.875C33.9711 30.7522 33.5815 30.734 33.2093 30.8224C32.8372 30.9108 32.4975 31.1024 32.2292 31.375L28.9583 35.4792C23.0625 32.6667 17.5417 27.3542 14.6042 21.25L18.6667 17.7917C19.2292 17.2083 19.3958 16.3958 19.1667 15.6667C18.3958 13.3542 18 10.875 18 8.3125C18 7.1875 17.0625 6.25 15.9375 6.25H8.72917C7.60417 6.25 6.25 6.75 6.25 8.3125C6.25 27.6667 22.3542 43.75 41.6875 43.75C43.1667 43.75 43.75 42.4375 43.75 41.2917V34.1042C43.75 32.9792 42.8125 32.0417 41.6875 32.0417Z"
              fill="currentColor"
            />
          </svg>
          {{ phone }}
        </a>
      </p>
    </div>

    <main class="body">
      <!-- <img src="course_image.png" alt="" /> -->
      <p class=""></p>
    </main>
  </div>
</template>

<script>
export default {
  name: "Contact",

  computed: {
    email() {
      return this.$store.state.site.email;
    },
    phone() {
      return this.$store.state.site.phone;
    }
  }
};
</script>
