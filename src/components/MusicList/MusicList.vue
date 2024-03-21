<script setup lang="ts">
import { nextTick,onMounted } from 'vue';
import { useChangeStore } from '@/stores/change'
import { useCacheStore } from '@/stores/noCache'
import { storeToRefs } from "pinia";
import { convertSeconds } from '@/utils/timeRemapping.ts'
const store = useChangeStore()
const store1 = useCacheStore()
const { playIndex, showOpen, Audio } = storeToRefs(store)
const { lastLick, activeIndex } = storeToRefs(store1)
const getLyic = store.getLyic
const { playList } = storeToRefs(store)
   const getBackgroundColor=(index:any)=> {
            if ((index + 1) % 2 === 0) {
                return true; 
            }
    }
    const pops = defineProps({
    songList: {
        type: Object
    }
})
onMounted(()=>{
})
 const playAudio = async (item: any,index:any) => {
    playList.value = pops.songList
    playIndex.value = index
    await getLyic(item.id)
    if(lastLick.value !== item.id) {   
        Audio.value.pause()
        play()  
    }else{
        play()   
    }
    lastLick.value = item.id  
}
const play =  () => {
    showOpen.value = !showOpen.value
    if (Audio.value.paused) {
        nextTick(()=>{
             Audio.value.play()
        })
    } else {
            Audio.value.pause()
    }
}
</script>
<template>
    <div class="container">
        <div class="header">
            <div class="left">歌名/歌手</div>
            <div class="center">专辑</div>
            <div class="right">时常</div>
        </div>
        <div class="list-hover" style="margin-bottom: 100px;">
        <div class="list" v-for="(item,index) in pops.songList" :key="index" :class="{ activebgc: getBackgroundColor(index) , activelist : activeIndex === index }" @dblclick.stop="playAudio(item,index)">
            <div class="left">
                <div class="left-left">
                    <img class="img1" :src="item.al.picUrl"/>
                    <div class="span">
                        <span style="font-size: 15px; font-weight: 510;">{{item.name}}</span>
                        <span style="display: flex;"><span style="font-size: 12px;color: #474444; margin-right: 10px;" v-for="(arname) in item.ar" :key="arname.id">{{ arname.name }}</span></span>
                    </div>
                </div>
                <div class="left-right">
                    <img src="../../asstes/like.png"/>
                    <img class="img2" src="../../asstes/xiazai.png"/>
                    <img class="img2" src="../../asstes/add.png"/>
                    <img class="img2" src="../../asstes/gengduo.png"/>
                </div>
            </div>
            <div class="center">{{item.al.name}}</div>
            <div class="right">{{ convertSeconds((item.dt) / 1000) || '00:00' }}</div>
        </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}
.header{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;  
    font-size: 12px; 
    color: #474444;
}
.left{
 flex: 0 1 60%;
 display: flex;
 justify-content: space-between;
}
.right{
    margin-right: 30px;
    flex: 0 1 10%;
    display: flex;
    justify-content: end;
    font-size: 12px; 
    color: #474444;
    align-items: center;
}
.center{
    flex: 0 1 20%;
    display: flex;
    justify-content: end;
    font-size: 12px; 
    color: #474444;
    align-items: center;
}
.list{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    user-select: none;
}
.img1{
    margin-left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
}
.left-left{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .span{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 10px;
    }
}
.left-right{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        margin: 0 10px;
        width: 25px;
        height: 25px;
        
    }
}
img{
    cursor:pointer;
}
.img2{
     opacity: 0;
}
.activebgc{
    background-color: #f8f8f8;
}
.list:hover {
    background-color: #eae9e9;
    border-radius: 2px;
}
.list:hover .img2 {
     opacity: 1;
}
.activelist {
    background-color: #eae9e9;
    border-radius: 2px;
}
</style>