<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { getVideo } from '@/apis/main'
import {ref,onMounted} from 'vue'
import { useRouter } from "vue-router";
let router = useRouter();
const { y } = useScroll(window)
const VideoList = ref()
const getVideoList = async () =>{
    const res = await getVideo()
    VideoList.value = res.data.datas.slice(0,5)
}
onMounted(()=>{
    getVideoList()
})
const playVideo = (vid:any) => { 
    router.push({ path: 'videoPlay',query:{vid:vid} })
}
</script>
<template>
    
    <div class="span1" :class="{ show: y > 120 }">
        <span v-for="(index) in 4" :key="index" style="margin-right: 60px; cursor:pointer;">推荐</span>
    </div>
    <div class="container">
    <div class="main">
      <div>
        <h1 style="margin-bottom: 25px;">视频</h1>
      </div>
      <div class="span">
        <span v-for="(index) in 4" :key="index" style="margin-right: 60px; cursor:pointer;">推荐</span>
      </div>
      <div class="swiper"></div>
      <div  v-for="(item) in VideoList" :key="item.data.vid">
      <h2 style="margin-top: 30px ;">最新</h2>
      <div class="card">
        <div class="card-list" v-for="(item) in VideoList" :key="item.data.vid" @click="playVideo(item.data.vid)">
            <div class="imgall">
            <img class="img" :src="item.data.coverUrl"/>
            <div class="img1">
                <img style="width: 70px; height: 70px;" src="../../asstes/tabplay.png"/>
            </div>
            </div>
            <div>
                <h4>{{ item.data.title }}</h4>
                <span style="font-weight: 500; font-size: 13px; color: rgb(99, 98, 97);">这个接口写的真是TFboys</span>
            </div>
        </div>
      </div>
      </div>
    </div>
    </div>
</template>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100vh;
    margin-top: 30px;
    margin-bottom: 550px;
}
.main{
    width: 78%;
    height: 100%;
    margin: 0 auto;
}
.card{
    margin-top: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    cursor:pointer;
}
.card-list{
    flex: 0 1 19%;
    position: relative;
    .img{
        width: 350px;
        height: 200px;
        border-radius: 8%;
        transition: transform 0.3s ease;
    }
}
.span{
    cursor:pointer;
}
span:hover {
    color: #53b7b4;
}
.span1{
    width: 0;
    height: 0;
    opacity: 0;
    &.show {
    width: 75%;
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
    span:first-child {
        margin-left: 79px;
    }
  }
}
.img1{
    position: absolute;
    width: 100%;
    height: 75%;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    border-radius: 8%;
    opacity: 0;
    z-index: -1;
    transition: transform 0.3s ease;
    img{
        position: absolute;
        top: 35%;
        left: 40%;
    }
}
.imgall:hover .img1 {
    opacity: 1;
    z-index: 1;
    transform: translateY(-10px);
}
.imgall:hover img {
    transform: translateY(-10px);
}
 

</style>