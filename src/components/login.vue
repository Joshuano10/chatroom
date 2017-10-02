<template>
    <div class="login">
        <myheader></myheader>
        <div class="name">
            <p class="welcome">欢迎来到聊天室</p>
            <label for="username">起个名字吧</label>
            <el-input id="username" v-model="username" placeholder="请输入用户名"></el-input>
            <el-button type="primary" @click="login()">进入聊天室</el-button>
        </div>
    </div>
</template>

<script>
import myheader from './myheader.vue';
import chat from './client.js';

export default {
    data() {
        return {
            username: ''
        };
    },
    methods: {
        login() {
            if (!this.username.trim()) {
                alert('名字不能为空');
                return;
            }
            window.localStorage.setItem('username', this.username);
            chat.init(this.username);
            this.$store.commit('isLogin', this.username);
            this.$router.push('../');
        }
    },
    created() {
        if (window.localStorage.username) {
            this.username = window.localStorage.username;
            this.login();
        }
    },
    components: {
        myheader
    }
}
</script>

<style>
    .name {
        width: 70%;
        margin: 0 auto;
    }
    .welcome {
        text-align: center;
        margin: 20px auto;
        font-size: 20px;
    }
    .login label {
        margin-left: 5px;
    }
    .login .el-input {
        margin-top: 10px;
    }
    .login .el-button {
        width: 100%;
        margin: 20px 0;
    }
</style>
