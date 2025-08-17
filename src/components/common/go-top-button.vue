<template>
  <div class="tool-button go-top-button" v-if="showGoTopButton" @click="toTop()">
    <SvgIcon name="go-top" :size="30" />
  </div>
</template>

<script>
import SvgIcon from '@/components/icon';

export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      scrollTop: 0,
      showGoTopButton: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollPage);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScrollPage);
  },
  watch: {
    scrollTop(scrollTop) {
      this.showGoTopButton = scrollTop > window.innerHeight / 2;
    },
  },
  methods: {
    onScrollPage() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  }
};
</script>
