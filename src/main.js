import Vue from 'vue'
import App from './App.vue'
import './assets/styles/style.css'
import Routes from "./router/router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import vuetify from './plugins/vuetify'
import VMask from 'v-mask';
import VueRouter from "vue-router";
import axios from 'axios';

const instance = axios.create({
  // Configuration
  baseURL: 'https://dev.moydomonline.ru/',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});
window.axios = instance 

Vue.config.productionTip = false

library.add(fas)

Vue.use(VueRouter).use(VMask).component('fontawesome-icon');

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  // component: 'fontawesome-icon',
  FontAwesomeIcon,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
