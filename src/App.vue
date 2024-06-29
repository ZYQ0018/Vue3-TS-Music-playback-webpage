<script setup lang="ts">
import VideoTab from '@/views/video/index.vue';
import { useChangeStore } from '@/stores/change';
import { useMainStore } from '@/stores/main';
import { useCacheStore } from '@/stores/noCache';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = useChangeStore();
const cacheStore = useCacheStore();
const { showOpen, Audio } = storeToRefs(store);
const { ActiveUp, ActiveDown, showLogin, img } = storeToRefs(cacheStore);
const login = useMainStore().login();
//设置游客登录接口
onMounted(() => {
    login;
});
window.addEventListener('keyup', event => {
    if (event.code === 'Space' && Audio.value.paused) {
        showOpen.value = !showOpen.value;
        Audio.value.play();
    } else if (event.code === 'Space' && !Audio.value.paused) {
        showOpen.value = !showOpen.value;
        Audio.value.pause();
    } else {
        return;
    }
});
const close = () => {
    showLogin.value = false;
};
const denglu = async () => {
    await login;
    showLogin.value = false;
};
</script>

<template>
    <router-view></router-view>
    <div class="VideoTab" :class="{ ActiveUp: ActiveUp, ActiveDown: ActiveDown }" @mousewheel.prevent>
        <VideoTab></VideoTab>
    </div>
    <!-- 扫码登录 -->
    <div class="login" v-if="showLogin" @touchmove.prevent>
        <div class="logo">
            <img src="./asstes/log.png" />
            <span @click="close">x</span>
        </div>
        <div class="QRcode">
            <img v-if="img" :src="img" />
            <div v-else></div>
            <div>使用网易云APP扫码登录</div>
        </div>
        <div class="visitorLogin" @click="denglu">游客登录</div>
    </div>
</template>

<style scoped lang="scss">
.VideoTab {
    width: 100%;
    height: 100.9%;
    position: fixed;
    bottom: -100%;
    z-index: 999;
    transition: all 0.5s ease-in;
}
.ActiveUp {
    animation: ActiveUp 0.5s forwards;
    -webkit-animation: ActiveUp 0.5s forwards;
    transition: all 0.1s ease;

    z-index: 999;
}
.ActiveDown {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    transition: all 0.1s ease;
    top: 0;
    animation: ActiveDown 1s forwards;
    -webkit-animation: ActiveDown 1s forwards;
}
@keyframes ActiveUp {
    0% {
        // opacity: 0;
    }

    10% {
        // opacity: 1;
    }
    100% {
        bottom: 0%;
        opacity: 1;
    }
}
@keyframes ActiveDown {
    0% {
    }

    90% {
    }
    100% {
        top: 101%;
    }
}
.login {
    position: fixed;
    width: 400px;
    height: 500px;
    z-index: 9999;
    left: calc(50% - 250px);
    top: calc(50% - 250px);
    background-color: #fff;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .logo {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            transform: translateX(10px);
        }
        span {
            width: 30px;
            height: 30px;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateX(164px);
            margin-top: -27px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
        }
    }
}
.QRcode {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 300px;
        height: 300px;
    }
    font-size: 13px;
}
.visitorLogin {
    width: 120px;
    height: 25px;
    margin: auto;
    display: flex;
    justify-content: center;
    transform: translateY(80px);
    align-items: center;
    cursor: pointer;
    background-color: #ececec;
    border-radius: 999em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.visitorLogin:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
