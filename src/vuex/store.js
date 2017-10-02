import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    username: ''
};

const mutations = {
    isLogin(state, username) {
        state.username = username;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
