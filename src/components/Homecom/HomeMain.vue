<script setup lang="ts">
import HomeMainbanner from './HomeMainbanner.vue'
import CircularCard from '@/components/CircularCard/CircularCard.vue'
import MusicCard from '@/components/MusicCard/MusicCard.vue'
import TabCard from '@/components/TabCard/TabCard.vue'
import { onMounted,ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from "pinia";
import { getDaily } from '@/apis/main'
const store = useMainStore()
const { Personalized1,Personalized2,Personalized3 } = storeToRefs(store)
const getPersonalizedList = store.getPersonalizedList
onMounted(() => {
    getPersonalizedList()
    getDailyList()
})
//TopTwo歌曲获取
    const dayMusic1 = ref()
    const dayMusic2 = ref()
    const getDailyList = async () => {
    const res = await getDaily()
    dayMusic1.value = res.data.data.dailySongs.slice(0, 9)
    dayMusic2.value = res.data.data.dailySongs.slice(9, 18)
}
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
        <div style="margin-bottom: 10px; font-size: 20px; font-weight: 600;">推荐列表</div>
        <TabCard :Personalized="Personalized2"></TabCard>
    </div>
    <div class="TopFour">
        <TabCard :Personalized="Personalized3"></TabCard>
    </div>
    <div class="TopFive">
        <MusicCard :dayMusic="dayMusic2"></MusicCard>
    </div>
    <div class="bottom-div"></div>
    </div>
</template>
<style lang="scss" scoped>
.body{
    width: 100%;
    height: 100%;
}
.banner{
    position: absolute;
    top: 20%;
    left: calc(50% - 260px);
}
.TopOne{
    position: absolute;
    top: 33%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 25%;
}
.TopTwo{
    position: absolute;
    top: 61%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 20%;
}
.CircularCard{
    position: absolute;
    top: 90%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 15%;
}
.TopThree{
    position: absolute;
    top: 110%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 25%;
}
.TopFour{
    position: absolute;
    top: 140%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 25%;
}
.TopFive{
    position: absolute;
    top: 168%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 20%;
}
.bottom-div{
    position: absolute;
    top: 187%;
    left: calc((50% - 35%) + 140px);
    width: 70%;
    height: 10%;
}
</style>