<template>
    <div class="send">
        <el-input v-model="message"></el-input>
        <div class="btn" :class="{'ok':this.message.trim()}" @click="send()">
            发送
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: ''
        };
    },
    methods: {
        send() {
            if (!this.message.trim()) {
                return;
            }
            this.$emit('mysend', this.message);
            this.message = '';
        }
    }
}
</script>

<style>
    .send {
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 5px 0;
        display: flex;
        width: 100%;
        height: 40px;
        background-color: #E5E9F2;
    }
    .send .el-input {
        flex: 1;
        height: 100%;
        margin: 0 5px;
    }
    .send .el-input__inner {
        padding: 0;
        height: 100%;
    }
    .btn {
        width: 60px;
        height: 40px;
        border-radius: 5px;
        background-color: #D3DCE6;
        color: white;
        line-height: 40px;
        text-align: center;
    }
    .btn.ok {
        background-color: #20A0FF;
    }
</style>
