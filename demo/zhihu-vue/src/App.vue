<template>
    <login></login>
</template>

<script>
    import Login from './components/Login/index.vue';

    export default {
        name: 'app',
        components: {
            Login
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        color: #555;
        font-size: 15px;
        line-height: 1.7;
        font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
        background: #f7fafc;
        -webkit-font-smoothing: subpixel-antialiased;
    }
</style>
