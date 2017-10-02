<template>
    <div class="tip">
        <span>{{msg}}</span>
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
    .tip {
        display: flex;
        height: 40px;
        margin: 10px;
    }
    .tip span {
        margin: 0 auto;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #C0CCDA;
        height: 30px;
        line-height: 30px;
        color: white;
    }
</style>
