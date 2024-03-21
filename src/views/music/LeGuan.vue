<script setup lang="ts">
import TopTab from '@/components/Homecom/TopTab.vue'
import TabCard from '@/components/TabCard/TabCard.vue'
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)
import { onMounted,ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from "pinia";
import { getRecommend } from '@/apis/main'
const store = useMainStore()
const RecommendList = ref()
const { Personalized4, Personalized5, Personalized6 } = storeToRefs(store)
const getPersonalizedList = store.getPersonalizedList
//电台
const getRecommendList = async () =>{
    const res = await getRecommend()
    RecommendList.value = res.data.programs
    console.log(RecommendList.value);
       
}
onMounted(() => {
    getPersonalizedList()
    getRecommendList()
})
</script>
<template>
    <div class="span1" :class="{ show: y > 120 }" >
        <span v-for="(index1) in 8" :key="index1" style="margin-right: 60px; cursor:pointer;">精选</span>
    </div>
    <div class="container">
        <div class="top">
        <h1 class="title" style="margin-bottom: 25px;">乐馆</h1>
        <div class="span">
            <span v-for="(index) in 8" :key="index" style="margin-right: 60px; cursor:pointer;">精选</span>
        </div>
        
        </div>
    <div class="swiper">
        <TopTab :RecommendList="RecommendList"></TopTab>
    </div>
    <div class="main">
        
    <div class="asdas1">
        <div style="margin-bottom: -20px;">官方歌单<span style="font-size: 15px; color: #858282;margin-left: 20px;">官方甄选 唱、跳、rap</span></div>
        <TabCard :Personalized="Personalized4"></TabCard>
    </div>
    <div class="asdas2">
         <div style="margin-bottom: -20px;">官方歌单<span style="font-size: 15px; color: #858282;margin-left: 20px;">官方甄选 唱、跳、rap</span></div>
            <TabCard :Personalized="Personalized5"></TabCard>
    </div>
    <div class="asdas3">
         <div style="margin-bottom: -20px;">官方歌单<span style="font-size: 15px; color: #858282;margin-left: 20px;">官方甄选 唱、跳、rap</span></div>
            <TabCard :Personalized="Personalized6"></TabCard>
    </div>
    </div>
    </div>
</template>
<style lang="scss" scoped>
.container{
        width: 100%;
        height: 100%;
        margin-top: 30px;
        margin-bottom: 1300px;
    }
.span1{
    width: 0;
    height: 0;
    opacity: 0;
    &.show {
    width: 75%;
    // transition: all .2s ease;
    transform: none;
    position: fixed;
    top: 37px;
    z-index: 999;
    left: 17%;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to bottom ,#d8fbf9, #fff6f6);
    border-radius: 10px;
    opacity: 1;
    // #ffeeee
    span:first-child {
        margin-left: 79px;
    }
  }
}
.swiper{
    width: 1600px;
    height: 280px;
    margin:  auto;
}
.top{
    width: 70%;
    height: 100%;
    margin-left: 11%;
}
.main{
        width: 100%;
        height: 100%;
        display:flex;
        justify-content: center;
       
    }
.asdas1{
    position: absolute;
    top: 47%;
    width: 70%;
    height: 25%;
}
.asdas2{
    position: absolute;
    top: 77%;
    width: 70%;
    height: 25%;
}
.asdas3{
    position: absolute;
    top: 107%;
    width: 70%;
    height: 25%;

}
span:hover {
    color:#53b7b4 ;
}
</style>