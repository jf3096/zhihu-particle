<template>
    <form novalidate>
        <div class="inputGroups">
            <input class="input" placeholder="手机号或邮箱"/>
            <input class="input" placeholder="密码"/>
        </div>
        <button class="btn">
            登录
        </button>
        <div class="extra">
            <button class="phoneLogin">
                手机验证码登录
            </button>
            <button class="link fr">
                无法登录？
            </button>
        </div>
        <div class="extra">
            <button class="link">
                社交账号登录
            </button>
        </div>
    </form>
</template>
<style scoped>
    .inputGroups {
        padding: 1px 0;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
    }

    .input {
        line-height: 19px;
        color: #555;
        background: #fff;
        padding: 1em .8em;
        width: 100%;
        border: none;
        box-sizing: border-box;
        outline: none;
        font-size: 14px;
    }

    .input + .input {
        border-top: 1px solid #d5d5d5;
    }

    .btn {
        display: block;
        padding: 0;
        width: 100%;
        font-size: 15px;
        margin-top: 18px;
        color: #fff;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        background: #0f88eb;
        box-shadow: none;
        border: 0;
        border-radius: 3px;
        line-height: 41px;
        cursor: pointer;
    }

    .btn:hover {
        background: #55abed;
    }

    .extra {
        margin-top: 18px;
        overflow: hidden;
    }

    .phoneLogin {
        padding: 0;
        font-size: 14px;
        color: #5ca5e8;
        background: transparent;
        border: 0;
        cursor: pointer;
        outline: 0;
    }

    .fr {
        float: right;
    }

    .link {
        font-size: 14px;
        color: #555;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none;
    }
</style>
<script>
    export default {
        name: 'form'
    }
</script>