import Vue from 'vue'
import App from './App.vue'
import './assets/styles/style.css'
import router from "./router/router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import vuetify from './plugins/vuetify'
import VMask from 'v-mask';
import axios from 'axios';
import store from '@/store/store'

const instance = axios.create({
  // Configuration
  baseURL: 'https://dev.moydomonline.ru/api/',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    Authorization: "token " + store.getters.getUser.key,
  },
});

window.axios = instance

Vue.config.productionTip = false

library.add(fas)

Vue.use(VMask).component('fontawesome-icon');
// const router = new VueRouter({
//   routes: Routes,
//   mode: 'history'
// });

new Vue({
  // component: 'fontawesome-icon',
  FontAwesomeIcon,
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
