<template>
    <div class="message">
        <div class="head">
            <span class="icon-user"></span>
        </div>
        <span class="name">{{username}}</span>
        <div class="content">
            <p>{{msg}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String
        },
        username: {
            type: String
        }
    }
}
</script>

<style>
    .message {
        position: relative;
        margin-top: 20px;
        overflow: hidden;
    }
    .message .head {
        border-radius: 50%;
        border: 1px solid #000;
        height: 50px;
        width: 50px;
    }
    .message .head span {
        margin-left: 10px;
        line-height: 50px;
        font-size: 30px;
    }
    .message .name {
        position: absolute;
        left: 60px;
        top: 0;
        color: #8492A6;
    }
    .message .content {
        float: left;
        position: relative;
        left: 75px;
        top: -20px;
        padding: 4px 10px;
        max-width: 60%;
        background-color: white;
        border-radius: 5px;
    }
    .message .content:after {
        position: absolute;
        left: -20px;
        top: 10px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-right: 20px solid white;
        border-top: 1px solid transparent;
        border-bottom: 20px solid transparent;
    }
</style>
