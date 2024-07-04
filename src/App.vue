<script setup lang="ts">
import { useChangeStore } from '@/stores/change';
import { useMainStore } from '@/stores/main';
import { useCacheStore } from '@/stores/noCache';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useChangeStore();
const cacheStore = useCacheStore();
const { showOpen, Audio } = storeToRefs(store);
const { showLogin, img } = storeToRefs(cacheStore);
const getLyic = useChangeStore().getLyic('2158973221');

const login = useMainStore().login();
const getDailyList = useChangeStore().getDailyList();
//设置游客登录接口
onMounted(() => {
    login;
    getDailyList;
    getLyic;
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
