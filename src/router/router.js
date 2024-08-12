import Login from "@/components/pages/Login.vue"
import Main from "@/components/pages/Main.vue"
import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            // redirect: '/login',
            component: Main,
        },
        {
            path: "/login",
            // name: "login",
            component: Login,
        },
    ],
    mode: 'history'
})
