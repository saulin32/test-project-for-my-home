<template>
  <div data-app>
    <router-view></router-view>
  </div>
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
