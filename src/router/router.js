import Login from "@/components/pages/Login.vue"
import Main from "@/components/pages/Main.vue"
import Vue from 'vue'
import VueRouter from "vue-router"
import store from "../store/store"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name:'main',
            // redirect: '/login',
            component: Main,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (!store.getters.getUser.key && to.name !== 'login') {
        next({ path: '/login' })
    }
    next()
})

export default router