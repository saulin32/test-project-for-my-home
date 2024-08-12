import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {
            employee_id: null,
            key: null
        }
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, newUser) {
            localStorage.setItem('user', JSON.stringify({ ...newUser }))
            state.user = { ...newUser }
        },

    }
})


export default store