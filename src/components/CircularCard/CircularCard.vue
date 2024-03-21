<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { getBannerList } from '@/apis/main'
const scroller = ref()
const scrollerinner = ref()
const bannerList = ref()
onMounted(()=>{
    addAnimation()
})
const addAnimation = ()=>{
        scroller.value.setAttribute('data-animated',true)
        
    }
const mouseE = () => {
    scrollerinner.value.style.animationPlayState = 'paused'
}
const mouseL = ()=>{
    scrollerinner.value.style.animationPlayState = 'running'
}
onMounted(() => {
    getBanner()
})
const getBanner = async () => {
    const res = await getBannerList()
    bannerList.value = res.data.banners
}
</script>
<template>
    <div class="scroller" ref="scroller">
       <ul class="tag-list scroller_inner" ref="scrollerinner" @mouseenter="mouseE" @mouseleave="mouseL">
        <li v-for="(item) in bannerList" :key="item.targetId">
            <img :src="item.imageUrl"/>
        </li>
       </ul>
    </div>
</template>
<style lang="scss" scoped>
.scroller{
    width: 100%;
    height: 100%;
    cursor:pointer;
    transition: all 2s ease;
    .scroller_inner{
        width: 100%;
        height: 100%;
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
         transition: all 2s ease;
         li{
            height: 195px;
            width: 100%;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-radius:5%;
            img{
              width: 400px;
             height: 100%;
             border-radius:5%;
            }
        }
    }
}
.scroller[data-animated="true"] {
    overflow: hidden;
    mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent );
     transition: all 2s ease;
}
.scroller[data-animated="true"] .scroller_inner{
    width: max-content;
    flex-wrap: nowrap;
    animation: scroll 10s normal linear infinite;
     transition: all 2s ease;
}
@keyframes scroll {
    to{
        transform: translateX(calc(-55% - 30px ));
    }
}
    .tag-list {
        margin: 0;
        padding-inline: 0;
        list-style: none;
    }
</style>