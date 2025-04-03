<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {setRedirectToLogin} from "@/utils/request";

export default {
  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {
    setRedirectToLogin(() => {
      this.$router.push({ path: '/login' });
    });
  },

  mounted() {
    const redirect = sessionStorage.redirect
    delete sessionStorage.redirect
    if (redirect && redirect !== location.pathname) {
      this.$router.replace(redirect)
    }
  },

  methods: {}
}
</script>

<style scoped>

</style>
