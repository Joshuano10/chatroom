<template>
    <div class="chat">
        <header>
            聊天室<span class="online">在线人数：{{onlineCount}}</span><span class="el-icon-more" @click="more()"></span>
        </header>
        <div class="margin"></div>
        <ul>
            <li :is="comp.comp" :msg="comp.msg" :username="comp.username" v-for="comp in comps"></li>
        </ul>
        <div class="margin" id="botmargin"></div>
        <send @mysend="mysend"></send>
        <more ref="more"></more>
    </div>
</template>

<script>
import store from '../vuex/store.js'
import message from './message';
import send from './send';
import myMessage from './myMessage';
import chat from './client.js';
import tip from './tip';
import more from './more';

export default {
    data() {
        return {
            username: store.state.username,
            onlineCount: chat.onlineCount,
            comps: []
        };
    },
    methods: {
        addComp(comp, msg, username) {
            if (this.comps.length > 500) {
                this.comps.shift();
            }
            this.comps.push({
                comp,
                msg,
                username: username || ''
            });
        },
        more() {
            this.$refs.more.flag = true;
        },
        mysend(message) {
            this.addComp('myMessage',message);
            chat.mysend(message, this.username);
            setTimeout('document.body.scrollTop = document.body.scrollHeight', 100);
        }
    },
    created() {
         chat.anotherEnter(() => {
            this.onlineCount = chat.onlineCount;
            if (chat.message) {
                this.addComp('tip', chat.message);
            }
            setTimeout('document.body.scrollTop = document.body.scrollHeight', 100);
         });
         chat.anotherLeave(() => {
            this.onlineCount = chat.onlineCount;
            if (chat.message) {
                this.addComp('tip', chat.message);
            }
            setTimeout('document.body.scrollTop = document.body.scrollHeight', 100);
         });
         chat.anothersend(() => {
             this.addComp('message', chat.message, chat.username);
             console.log(document.body.scrollHeight);
             setTimeout('document.body.scrollTop = document.body.scrollHeight', 100);
         });
    },
    components: {
        message,
        send,
        myMessage,
        tip,
        more
    }
}
</script>

<style>
    .chat {
        height: 100%;
        background-color: #E5E9F2;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        z-index: 100;
        background-color: #20A0FF;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: white
    }
    .online {
        position: absolute;
        top: 0px;
        right: 60px;
        font-size: 16px;
    }
    header .el-icon-more {
        display: block;
        padding: 10px;
        position: absolute;
        top: 5px;
        right: 10px;
    }
    .margin {
        height: 50px;
    }
</style>
