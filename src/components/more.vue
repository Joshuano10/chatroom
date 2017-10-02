<template>
    <div class="more" v-show="flag">
        <myheader></myheader>
        <span class="el-icon-arrow-left" @click="back()"></span>
        <div class="wrapper">
            <span class="name">昵称：{{name}}</span>
            <el-button type="danger" @click="logout()">退出</el-button>
        </div>

    </div>
</template>

<script>
import store from '../vuex/store.js'
import myheader from './myheader';

export default {
    data() {
        return {
            name: store.state.username,
            flag: false
        };
    },
    methods: {
        back() {
            this.flag = false;
        },
        logout() {
            window.localStorage.removeItem('userinfo');
            this.$store.commit('isLogin', '');
             window.location.reload();
        }
    },
    components: {
        myheader
    }
}
</script>

<style>
    .more {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 600;
        background-color: #E5E9F2;
        height: 100%;
        width: 100%;
    }
    .more .wrapper {
        width: 70%;
        margin: 0 auto;
    }
    .more .name {
        display: block;
        text-align: center;
        margin: 20px 0 ;
        height: 50px;
        width: 100%;
        line-height: 50px;
        font-size: 20px;
    }
    .more button {
        height: 40px;
        width: 100%;
    }
    .more .el-icon-arrow-left {
        position: fixed;
        top: 5px;
        left: 5px;
        display: block;
        padding: 10px;
        font-size: 20px;
        font-weight: bold;
        color: white;
    }
</style>
