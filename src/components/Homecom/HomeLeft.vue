<script setup lang="ts">
import { ref } from 'vue';
import { useChangeStore } from '@/stores/change';
import { storeToRefs } from 'pinia';
import img1 from '../../asstes/shouye.png';
import img2 from '../../asstes/yueguan.png';
import img3 from '../../asstes/shipin.png';
import img4 from '../../asstes/leida.png';
import img5 from '../../asstes/xihuan.png';
import img6 from '../../asstes/zuijin.png';
import img7 from '../../asstes/xiazai.png';
import img8 from '../../asstes/shiting.png';
const store = useChangeStore();
const { activeIndex } = storeToRefs(store);
const activestyle = ref(false);
const deley = ref(true);
const isShow = () => {
    activestyle.value = !activestyle.value;
    deley.value = !deley.value;
};
const List1 = ref([
    { routerLink: 'homemain', src: img1, span: '推荐', id: 1 },
    { routerLink: 'LeGuan', src: img2, span: '音乐馆', id: 2 },
    { routerLink: 'Video', src: img3, span: '视频', id: 3 },
    { routerLink: 'Radar', src: img4, span: '雷达', id: 4 },
]);
const List2 = ref([
    { routerLink: 'Like', src: img5, span: '喜欢', id: 5 },
    { routerLink: 'RecentlyPlayed', src: img6, span: '最近播放', id: 6 },
    { routerLink: 'Local', src: img7, span: '本地', id: 7 },
    { routerLink: 'Audition', src: img8, span: '试听列表', id: 8 },
]);
const changeActiveIndex = (id: number) => {
    activeIndex.value = id;
};
</script>
<template>
    <div :class="[activestyle ? 'newActive' : '', !activestyle ? 'container' : '']">
        <div class="log">
            <div class="log-text">
                <img class="logleft" src="../../asstes/log.png" />
                <span style="cursor: default">ZX音乐</span>
            </div>
            <div class="right" @click="isShow">
                <img class="logright" src="../../asstes/expand.png" />
            </div>
        </div>
        <ul>
            <h5>在线音乐</h5>
            <li class="listyle" v-for="item in List1" :key="item.id">
                <RouterLink :to="{ name: item?.routerLink }" :class="[activeIndex === item.id ? 'activeIndex' : '']" @click="changeActiveIndex(item.id)">
                    <img :src="item.src" />
                    <span>{{ item.span }}</span>
                </RouterLink>
            </li>
        </ul>
        <ul>
            <h5>我的音乐</h5>
            <li class="listyle" v-for="item in List2" :key="item.id">
                <RouterLink :to="{ name: item?.routerLink }" :class="[activeIndex === item.id ? 'activeIndex' : '']" @click="changeActiveIndex(item.id)">
                    <img :src="item.src" />
                    <span>{{ item.span }}</span>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
h5 {
    font-size: 28px;
}
body {
    ul {
        margin: 20px 0;
    }
    ul .listyle {
        list-style: none;
        position: relative;
        width: 95%;
        line-height: 50px;
        font-size: 20px;
        font-weight: 500;
    }
    ul .listyle img {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
    }
    ul .listyle a {
        color: #8b8686;
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 0 8px;
        border-radius: 10px;
    }
    ul .listyle a:hover {
        background: rgb(229, 229, 226);
        color: black !important;
    }
}
.container {
    background: rgba(240, 240, 237, 1);
    padding: 20px 0 20px 20px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1), 0 4px 2px rgba(0, 0, 0, 0.1), 0 5px 1px rgba(0, 0, 0, 0.1);
}
.log {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .log-text {
        display: flex;
        align-items: center;
        span {
            margin-left: 25px;
            text-align: center;
            height: 100px;
            font-size: 20px;
            line-height: 100px;
            font-weight: 700;
        }
    }
}
.logleft {
    width: 55px;
    height: 55px;
    transform: translateX(18px);
}
.logright {
    width: 25px;
    height: 25px;
}
.newActive {
    transition: 0.5s ease;
    width: 105px;
    background: rgba(240, 240, 237, 0.7);
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1), 0 4px 2px rgba(0, 0, 0, 0.1), 0 5px 1px rgba(0, 0, 0, 0.1);
    .log-text span {
        visibility: hidden;
    }
    ul .listyle span {
        visibility: hidden;
    }
    ul .listyle img {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 50px;
    }
    ul .listyle a {
        width: 30px;
        height: 50px;
        text-decoration: none;
        border-radius: 10px;
        margin: 0 auto;
    }
}
.activeIndex {
    background: rgb(229, 229, 226);
    color: black !important;
}
</style>
