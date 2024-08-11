<template>
  <router-view></router-view>
  <!-- <Login /> -->
</template>

<script>
import Login from './components/pages/Login.vue';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
