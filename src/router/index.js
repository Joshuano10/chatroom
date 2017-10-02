import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login.vue';
import chat from '../components/chat.vue';
import store from '../vuex/store.js';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: chat,
            beforeEnter: (to, from, next) => {
                if (!store.state.username) {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}
                    });
                } else {
                    next();
                }
            }
        },
        {
            path: '/login',
            component: login
        }
    ]
});
