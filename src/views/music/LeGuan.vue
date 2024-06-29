<script setup lang="ts">
import TopTab from '@/components/Homecom/TopTab.vue';
import TabCard from '@/components/TabCard/TabCard.vue';
import { useScroll } from '@vueuse/core';
const { y } = useScroll(window);
import { onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { getRecommend } from '@/apis/main';
const store = useMainStore();
const RecommendList = ref();
const { Personalized4, Personalized5, Personalized6 } = storeToRefs(store);
const getPersonalizedList = store.getPersonalizedList;
//电台
const getRecommendList = async () => {
    const res = await getRecommend();
    RecommendList.value = res.data.programs;
    console.log(RecommendList.value);
};
onMounted(() => {
    getPersonalizedList();
    getRecommendList();
});
</script>
<template>
    <div class="span1" :class="{ show: y > 120 }">
        <span v-for="index1 in 8" :key="index1" class="tabList">精选</span>
    </div>
    <div class="container">
        <div class="top">
            <h1 class="title">乐馆</h1>
            <div class="span">
                <span v-for="index in 8" :key="index" class="tabList">精选</span>
            </div>
        </div>
        <div class="swiper">
            <TopTab :RecommendList="RecommendList"></TopTab>
        </div>
        <div class="main">
            <div class="asdas1">
                <div class="asdas-container">
                    官方歌单
                    <span class="asdas-title">官方甄选 唱、跳、rap</span>
                </div>
                <TabCard :Personalized="Personalized4"></TabCard>
            </div>
            <div class="asdas2">
                <div class="asdas-container">
                    官方歌单
                    <span class="asdas-title">官方甄选 唱、跳、rap</span>
                </div>
                <TabCard :Personalized="Personalized5"></TabCard>
            </div>
            <div class="asdas3">
                <div class="asdas-container">
                    官方歌单
                    <span class="asdas-title">官方甄选 唱、跳、rap</span>
                </div>
                <TabCard :Personalized="Personalized6"></TabCard>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    margin-top: 30px;
}
.span1 {
    width: 0;
    height: 0;
    opacity: 0;
    &.show {
        width: 75%;
        // transition: all .2s ease;
        transform: none;
        position: fixed;
        top: 36px;
        z-index: 999;
        left: 17%;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(to bottom, #d8fbf9, #fff6f6);
        border-radius: 10px;
        opacity: 1;
        // #ffeeee
        span:first-child {
            margin-left: 79px;
        }
    }
}
.swiper {
    width: 1600px;
    height: 280px;
    margin: auto;
}
.top {
    width: 70%;
    height: 100%;
    margin-left: 11%;
    margin-bottom: 100px;
}
.main {
    width: 100%;
    height: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.asdas1 {
    position: relative;
    width: 80%;
    height: 350px;
    margin-bottom: 150px;
}
.asdas2 {
    position: relative;
    width: 80%;
    height: 350px;
    margin-bottom: 150px;
}
.asdas3 {
    position: relative;
    width: 80%;
    height: 350px;
}
span:hover {
    color: #53b7b4;
}
.tabList {
    margin-right: 60px;
    cursor: pointer;
}
.title {
    margin-bottom: 25px;
}
.asdas-container {
    margin-bottom: 10px;
    font-size: 30px;
    .asdas-title {
        font-size: 25px;
        color: #858282;
        margin-left: 20px;
    }
}
.bottom {
    width: 100px;
    height: 30px;
    position: absolute;
    top: 185%;
}
</style>
