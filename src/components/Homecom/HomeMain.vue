<script setup lang="ts">
import HomeMainbanner from './HomeMainbanner.vue';
import CircularCard from '@/components/CircularCard/CircularCard.vue';
import MusicCard from '@/components/MusicCard/MusicCard.vue';
import TabCard from '@/components/TabCard/TabCard.vue';
// import VideoTab from '@/views/video/index.vue';

import { onMounted, ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
// import { useCacheStore } from '@/stores/noCache';
// const cacheStore = useCacheStore();

import { getDaily } from '@/apis/main';
const store = useMainStore();
const { Personalized1, Personalized2, Personalized3 } = storeToRefs(store);
// const { ActiveUp, ActiveDown } = storeToRefs(cacheStore);

const getPersonalizedList = store.getPersonalizedList;
onMounted(() => {
    getPersonalizedList();
    getDailyList();
});
//TopTwo歌曲获取
const dayMusic1 = ref();
const dayMusic2 = ref();
const getDailyList = async () => {
    const res = await getDaily();
    dayMusic1.value = res.data.data.dailySongs.slice(0, 9);
    dayMusic2.value = res.data.data.dailySongs.slice(9, 18);
};
</script>
<template>
    <div class="body">
        <div class="banner">
            <HomeMainbanner></HomeMainbanner>
        </div>
        <div class="TopOne">
            <TabCard :Personalized="Personalized1"></TabCard>
        </div>
        <div class="TopTwo">
            <MusicCard :dayMusic="dayMusic1"></MusicCard>
        </div>
        <div class="CircularCard">
            <CircularCard></CircularCard>
        </div>
        <div class="TopThree">
            <div style="margin-bottom: 10px; font-size: 20px; font-weight: 600">推荐列表</div>
            <TabCard :Personalized="Personalized2"></TabCard>
        </div>
        <div class="TopFour">
            <TabCard :Personalized="Personalized3"></TabCard>
        </div>
        <div class="TopFive">
            <MusicCard :dayMusic="dayMusic2"></MusicCard>
        </div>
        <div class="bottom-div"></div>
        <!-- <div class="VideoTab" :class="{ ActiveUp: ActiveUp, ActiveDown: ActiveDown }" @mousewheel.prevent>
            <VideoTab></VideoTab>
        </div> -->
    </div>
</template>
<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100%;
}
.banner {
    position: absolute;
    top: 25%;
    left: calc(50% - 260px);
}
.TopOne {
    position: absolute;
    top: 38%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 30%;
}
.TopTwo {
    position: absolute;
    top: 75%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 20%;
}
.CircularCard {
    position: absolute;
    top: 100%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 15%;
}
.TopThree {
    position: absolute;
    top: 120%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 30%;
}
.TopFour {
    position: absolute;
    top: 165%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 30%;
}
.TopFive {
    position: absolute;
    top: 202%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 20%;
}
.bottom-div {
    position: absolute;
    top: 215%;
    width: 100px;
    height: 200px;
}
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
</style>
