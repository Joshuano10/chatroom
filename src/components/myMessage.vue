<template>
    <div class="myMessage">
        <div class="head">
            <span class="icon-user"></span>
        </div>
        <span class="name">我</span>
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
        }
    }
}
</script>

<style>
    .myMessage {
        position: relative;
        margin: 20px 0;
        overflow: hidden;
    }
    .myMessage .head {
        float: right;
        border-radius: 50%;
        border: 1px solid #000;
        height: 50px;
        width: 50px;
    }
    .myMessage .head span {
        margin-left: 10px;
        line-height: 50px;
        font-size: 30px;
    }
    .myMessage .name {
        position: absolute;
        right: 80px;
        top: 0;
        color: #8492A6;
        text-align: right;
    }
    .myMessage .content {
        float: right;
        margin: 30px 20px 0 0;
        position: relative;
        padding: 0 10px;
        max-width: 60%;
        background-color: #20A0FF;
        color: white;
        border-radius: 5px;
    }
    .myMessage .content:after {
        position: absolute;
        right: -20px;
        top: 15px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-left: 20px solid #20A0FF;
        border-top: 1px solid transparent;
        border-bottom: 20px solid transparent;
    }
</style>
