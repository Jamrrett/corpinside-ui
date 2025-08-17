<template>
  <div>
    <myHeader></myHeader>
    <sidebar></sidebar>
    <div class="content-box">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <DarkModeButton />
    <GoTopButton />
  </div>
</template>

<script>
import DarkModeButton from "@/components/common/dark-mode-button.vue";
import GoTopButton from "@/components/common/go-top-button.vue";
import myHeader from './common/myHeader.vue';
import sidebar from './common/sidebar.vue';

export default {
  components: {
    DarkModeButton,
    GoTopButton,
    myHeader,
    sidebar
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {
    let root = document.querySelector(':root');
    root.style.setProperty('--backgroundPicture', 'url(' + process.env.BASE_URL + '/images/backgroundPicture.jpg)');
  },

  mounted() {

  },

  methods: {}
};
</script>

<style scoped>

  .content-box {
    position: absolute;
    left: 130px;
    right: 0;
    top: 70px;
    bottom: 0;
    transition: left .3s ease-in-out;
  }

  .content {
    width: auto;
    height: 100%;
    padding: 30px;
    overflow-y: scroll;
  }

</style>
