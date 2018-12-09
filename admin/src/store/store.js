import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null
    },
    mutations: {
        login: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.token=null;

        }
    }
})