<script setup lang="ts">
import {ref,onMounted, watch } from 'vue'
import { useChangeStore } from '@/stores/change'
import { useCacheStore } from '@/stores/noCache'
import { storeToRefs } from "pinia";
const store = useChangeStore()
const cacheStore = useCacheStore()
const { showOpen, playIndex, playList, lyric, Audio, currentTime } = storeToRefs(store)
const getLyic = store.getLyic
const playAudio = store.playAudio
const lyrics = ref(lyric)
const newLyric = ref()
const playIndex1 = ref(playIndex)
const playList1 = ref(playList)
const showVolume = ref(false)
const volume = ref()
onMounted(()=>{
    newLyric.value = changeLyric()
    findIndex()   
    createList()
    setOffSet()
    playAudio(Audio.value)  
})
function convertSeconds(seconds:any) {
    seconds = Math.floor(seconds)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = seconds - hours * 3600 - minutes * 60;

    return `${minutes < 10 ? '0'+ minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}
// const Progresschilder = ref((1016 / Audio.value.duration * currentTime.value).toFixed(0))
const changeLyric = () => {
    const lines = lyrics.value.lyric.split('\n')
    const result = []
    for (let i = 0; i < lines.length - 1; i++) {
        const str = lines[i]
        const parts = str.split(']')
        const timerStr = parts[0].substring(1)
        const obj = {
            time: parseTime(timerStr),
            words: parts[1]
        }
        result.push(obj)
    }
    return result
}
//将时间转换成秒
const parseTime = (timerStr: string) => {
    const parts = timerStr.split(':')
    return +parts[0] * 60 + +parts[1]
}
//找到当前时间该显示的歌词
const findIndex = () => {
    const curTime = Audio.value.currentTime   
    for (let i = 0; i < newLyric.value!.length; i++) {
        if (curTime <= newLyric.value[i].time) {
            return i - 1
        }
    }
    return newLyric.value.length - 1
}
//创建歌词元素
const createList = () => {
    const ul = document.querySelector('.ul-a')
    const lis = ul?.querySelectorAll("li")
    lis?.forEach(item => {
        ul?.removeChild(item)
    });
    for (let i = 0; i < newLyric.value.length; i++) {
        const li = document.createElement('li')
        li.textContent = newLyric.value[i].words

        document.querySelector('.ul-a')?.appendChild(li)
    }
}
//设置歌词上移位置
const setOffSet = () => {
    let index = findIndex()
    const geciHeight = document.querySelector('.lyrics')?.clientHeight
    const LiHeight = document.querySelector('.ul-a')?.children[0].clientHeight
    const maxOffSet = document.querySelector('.ul-a')?.clientHeight! - geciHeight!
    let offset = LiHeight! * index + LiHeight! / 2 - geciHeight! /2
    if (offset <= 0) {
        offset = 0
    }
    if (offset >= maxOffSet) {
        offset = maxOffSet
    }
    const ul_a = document.querySelector('.ul-a') as HTMLElement
    ul_a.style.transform = `translateY(-${offset}px)`
    const li = document.querySelector('.ul-a')!.children[index]
    const clearLiStyle = document.querySelector('.activea')
    if (clearLiStyle) {
        clearLiStyle.classList.remove('activea')
    }
    if (li) {
        li.classList.add('activea')
    }
}
const changeActive = () =>{
    cacheStore.changeActiveDown()
}
//监听时间变化改变歌词位置
watch (currentTime ,()=>{
    setOffSet() 
})
watch([playIndex1, playList1], async () => {
    await getLyic(playList.value[playIndex.value as keyof typeof playList].id)
    setOffSet()
    changeList() 
})
//播放功能
const play =  () => {  
    playAudio(Audio.value)
    showOpen.value = !showOpen.value
    if (Audio.value.paused) {
        Audio.value.play()
        
    } else {
        Audio.value.pause()
    }
}
const changeList = () => {
    newLyric.value = changeLyric()
    findIndex()
    createList()
    playAudio(Audio.value)
}
//上一首
const previousPong = async () => {
    playIndex.value--
    if (playIndex.value < 0) {
        playIndex.value = playList.value.length - 1
    }
    await getLyic(playList.value[playIndex.value as keyof typeof playList].id)
    changeList()
    Audio.value.play()
    playAudio(Audio.value)
}
//下一首
const nextSong = async () => {
    playIndex.value++
    if (playIndex.value > playList.value.length - 1) {
        playIndex.value = 0
    }
    await getLyic(playList.value[playIndex.value as keyof typeof playList].id)
    changeList()
    Audio.value.play()
    playAudio(Audio.value)
}
//调节音量显示
const changeVolume = () =>{
    showVolume.value =!showVolume.value
}
// 监听volume变化，并更新audio的音量
watch(volume, () => {
    if (Audio.value) {
        setVolume();
    }
})
const setVolume =()=> {
    if (Audio.value) {
        Audio.value.volume = volume.value / 100;
    }
}
</script>
<template>
    <div class='slide-left'>
        <div class="bg" v-if="playList[playIndex].al.picUrl" :style="{ backgroundImage: 'url(' + playList[playIndex].al.picUrl + ')' }"></div>
    <div class="container" >
        <div class="main">
        <div class="img">
            <img class="img1" src="../../asstes/bgc1.jpg"/>
            <img class="img2" :src="playList[playIndex].al.picUrl"/>
        </div>
        <div class="lyrics">
            <ul class="ul-a">
            </ul>
        </div>
        </div>
        </div>
    <div class="bottom">
        <div class="bottom-left">
            <div @click="changeActive" class="bottom-left-left">
                <img class="left-img1" :src="playList[playIndex].al.picUrl"/>
                <div style="margin-left: 20px;">
                    <h3 style="cursor:default; margin-bottom: 5px;">{{ playList[playIndex].name }}</h3>
                    <span style="cursor:default;" v-for="(arname) in playList[playIndex].ar" :key="arname.id">{{ arname.name }}</span>
                    </div>
            </div>
                    <img class="left-img2" src="../../asstes/like.png" title="收藏"/> 
                    <img class="left-img2" src="../../asstes/unlike.png" title="取消收藏"/>
                    <img class="left-img2" src="../../asstes/pinglun.png" title="评论"/>
                    <img class="left-img2" src="../../asstes/gengduo.png" title="更多"/>
        </div>
        <div class="bottom-center">
            <div class="top">
                    <img class="top-img" src="../../asstes/repeat_line.png" title="循环播放"/>
                    <div class="hoverb" @click="previousPong"><img src="../../asstes/go-end (2).png" title="上一首"/></div>
                    <div class="hoverb"  v-if="showOpen" @click="play"><img  src="../../asstes/pause.png" title="播放歌曲"/></div>
                    <div class="hoverb" v-else @click="play"><img src="../../asstes/play.png" title="暂停歌曲" /></div>
                    <div class="hoverb" @click="nextSong"><img src="../../asstes/go-end (1).png" title="下一首"/></div>
                    <img class="top-img" @click="changeVolume" src="../../asstes/volume.png" title="音量"/>
                </div>
                <div class="bottom-center-bottom">
                  <div>{{ convertSeconds(currentTime) ||'00:00' }}</div><div class="Progress"><div class="Progress-childer" :style="{width: (1016 / Audio.duration * currentTime) +'px' || 0}"></div></div><div>{{ convertSeconds(Audio.duration) ||'00:00' }}</div>
                </div>
        </div>
        <div class="bottom-right">
            <img src="../../asstes/moshi.png" title="音乐品质"/>
                <img src="../../asstes/yinxiao.png" title="音效"/>
                <img src="../../asstes/geci.png" title="打开歌词"/>
                <img src="../../asstes/liebiao.png" title="播放列表"/>
        </div>
    </div>  
    <div class="sliderInput" v-show="showVolume">
    <input type="range" min="0" max="100" value="0" id="rangeInput" step="1" v-model="volume" class="custom-range"  onchange="document.getElementById('show').innerHTML=value">
    <div class="div" >
        <span id="show"></span>
    </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.bg{
    background-image: url(../../asstes/bgc1.jpg);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -99;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    background: linear-gradient(to top,#2e8383, #ffeeee);
}
.container{
    width: 100%;
    height: 100vh;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center; 
    z-index: 9;   
}
.main{
    width: 94%;
    height: 70%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    img{
    width: 35%;
    height: 80%;
    }
    .img1{
    position: absolute;
    transform: perspective(1000px) rotateY(-15deg);
    height: 65%;
    top: 5%;
    box-shadow: 0 50px 70px rgba(0,0,0,0.1),
     0 10px 10px rgba(0,0,0,0.5);
}
.img2{
    position: absolute;
   transform: translateX(200px);
   width: 31%;
   height: 75%;
   box-shadow: 0 50px 70px rgba(0,0,0,0.5),
               0 10px 10px rgba(0,0,0,0.1);
}
}
.lyrics {
    height: 100%;
    width: 60%;
    transition: all .5s ease;
    overflow: hidden;
    text-align: center;
    ul{
        list-style: none;
        transition: all .5s ease;
:deep(li) {
    font-weight: 600;
    font-size: 30px;
    line-height: 90px;
    height: 90px;
    transition: all .3s ease;
    color:rgb(42, 79, 85) ;
}
:deep(.activea) {
    transform: scale(1.4);
    color:rgb(4, 140, 161);
}
}
}
.bottom{
    display: flex;
    position: absolute;
    width: 100%;
    height: 7%;
    bottom: 0;
    background-color: rgba($color: #000, $alpha: 0.2);
    color: #fff;
    transition: all .3s ease;
    .bottom-left{
        flex: 0 1 25%;
        padding: 10px;
        display: flex;
        align-items: center;
        img{
            cursor:pointer;
        }
        
            .left-img1{
    height: 66px;
    width: 66px;
    cursor:pointer;
    border-radius: 10px;
    transition: all .2s ease;
}
.left-img1:hover{ 
    box-shadow: 
        inset rgba(0,0,0,.9) 0 -3px 8px,
        inset rgba(252,255,255,.9) 0 3px 8px,
        rgba(0,0,0,.9) 0 3px 8px -3px;
        transform: scale(1.1);
}
        .left-img2{
    width: 25px;
    height: 25px;
    margin-left: 25px;
}
.left-img2:hover {
    transform: scale(1.2);
}
    }
    .bottom-center{
        flex: 0 1 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .bottom-right{
        flex: 0 1 25%;
        display: flex;
        justify-content: end;
        align-items: center;
        img{
            width: 30px;
            height: 30px;
            margin: 0 10px;
            transition: all .2s ease;
        }
        img:hover {
             transform: scale(1.2);
        }
    }
}
.top{
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 35px;
    height: 35px;
    margin: 0 15px;
    border-radius: 10%;
    transition: all .1s ease;
}
img:hover {
    transform: scale(1.2);
    background-color: rgba(164, 227, 236,.3);
}
}
.bottom-center-bottom{
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    .Progress{
        width: 1016px;
        height: 5px;
        margin: 0 20px;
        background: #000;
    }
    .Progress-childer{
        width: 0px;
        height: 5px;
        background: rgb(164, 227, 236);
    }
}
.slide-left { 
        position: absolute;  
        width: 100%;
        height: 100%;
	}
.bottom:hover {
    background-color: rgba($color: #fff, $alpha: 0.2);
}
.bottom-left-left{
    display: flex;
    align-items: center;
}
.sliderInput{
    top: 83.4%;
    left: 51.5%;
    width: 200px;
    height: 2rem;
    position: absolute;
    z-index: 99;
    background-color: rgba($color: #fff, $alpha: 0.4);
    transform: rotate(-90deg);
    border-top-right-radius: 20px 20px; /* 水平半径和垂直半径的一半 */
    border-bottom-right-radius: 20px 20px; 
    display: flex;
    justify-content: space-between;
.custom-range {
  transform: translateX(15px);
  -webkit-appearance: none;
  width: 150px;
  height: 2rem;
  background-color: rgba($color: #ccc, $alpha: 0.4);
  outline: none;
  opacity: 0.7;
  -webkit-transition: opacity .75s;
  transition: opacity .75s;
}
 .custom-range::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 10px;
    background-color: #fff;
 }
  .custom-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    background-color: #000;
    cursor: pointer;
    border-radius: 50%;
 }
.custom-range:hover {
  opacity: 1;
}
}
.div{
    transform: rotate(90deg);
    display: flex;
    font-weight: 550;
    margin-right: 15px;
}
</style>