<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useChangeStore } from '@/stores/change';
import { useCacheStore } from '@/stores/noCache';
import { storeToRefs } from 'pinia';
import message from '@/components/msg/msg.ts';
import { convertSeconds } from '@/utils/timeRemapping.ts';
const store = useChangeStore();
const cacheStore = useCacheStore();
const { showOpen, playIndex, playList, lyric, currentTime } = storeToRefs(store);
const { lastLick, activeIndex } = storeToRefs(cacheStore);
const playAudio = store.playAudio;
const getLyic = store.getLyic;
const isshowtab = ref(false);
const noClos = ref(false);
const Topping = ref(true);
const Audio = ref();
const lyrics = ref(lyric);
const initialVolume = ref(0.01);
const isTogglePlay = ref(false);
const duration = ref();
const showVolume = ref(false);
const volume = ref();

const showTab = () => {
    isshowtab.value = true;
};
const closTab = () => {
    if (noClos.value === false) {
        isshowtab.value = false;
    }
};
const bindshow = () => {
    Topping.value = !Topping.value;
    noClos.value = !noClos.value;
    isshowtab.value = !isshowtab.value;
    isshowtab.value = true;
};
const changeActive = () => {
    cacheStore.changeActiveUp();
};
const newLyric = ref();
onMounted(() => {
    playAudio(Audio.value);
    newLyric.value = changeLyric();
    findIndex();
    createList();
    setOffSet();
});
//将歌词字符串转换成数组对象
const changeLyric = () => {
    const lines = lyrics.value.lyric.split('\n');
    const result = [];
    for (let i = 0; i < lines.length - 1; i++) {
        const str = lines[i];
        const parts = str.split(']');
        const timerStr = parts[0].substring(1);
        const obj = {
            time: parseTime(timerStr),
            words: parts[1],
        };
        result.push(obj);
    }
    return result;
};
//将时间转换成秒
const parseTime = (timerStr: string) => {
    const parts = timerStr.split(':');
    return +parts[0] * 60 + +parts[1];
};
//找到当前时间该显示的歌词
const findIndex = () => {
    const curTime = Audio.value.currentTime;
    for (let i = 0; i < newLyric.value!.length; i++) {
        if (curTime <= newLyric.value[i].time) {
            return i - 1;
        }
    }
    return newLyric.value.length - 1;
};
//创建歌词元素
const createList = () => {
    const ul = document.querySelector('.ul-b');
    const lis = ul?.querySelectorAll('li');
    lis?.forEach(item => {
        ul?.removeChild(item);
    });
    for (let i = 0; i < newLyric.value.length; i++) {
        const li = document.createElement('li');
        li.textContent = newLyric.value[i].words;

        document.querySelector('.ul-b')?.appendChild(li);
    }
};
//设置歌词上移位置
const setOffSet = () => {
    currentTime.value = Audio.value.currentTime;
    let index = findIndex();
    const geciHeight = document.querySelector('.show-center')?.clientHeight;
    const LiHeight = document.querySelector('.ul-b')?.children[0].clientHeight;
    const maxOffSet = document.querySelector('.ul-b')?.clientHeight! - geciHeight!;
    let offset = LiHeight! * index + LiHeight! / 2 - geciHeight! / 2;
    if (offset <= 0) {
        offset = 0;
    }
    if (offset >= maxOffSet) {
        offset = maxOffSet;
    }
    const ul_b = document.querySelector('.ul-b') as HTMLElement;
    ul_b.style.transform = `translateY(-${offset}px)`;
    const li = document.querySelector('.ul-b')!.children[index];
    const clearLiStyle = document.querySelector('.active');
    if (clearLiStyle) {
        clearLiStyle.classList.remove('active');
    }
    if (li) {
        li.classList.add('active');
    }
};
//播放功能
const play = () => {
    showOpen.value = !showOpen.value;
    if (Audio.value.paused) {
        Audio.value.play();
    } else {
        Audio.value.pause();
    }
};
const changeList = () => {
    newLyric.value = changeLyric();
    findIndex();
    createList();
    setOffSet();
    playAudio(Audio.value);
};
// const left = document.querySelector('.Progress')
// const left1 = document.querySelector('.Progress-childer')
// function offsetLeft(elements:any) {
//     var left = elements.offsetLeft;
//     return left;
// }
// const left2 = offsetLeft(left1)
// console.log(offsetLeft(left), offsetLeft(left1));
// watch(left2,()=>{
//     console.log(11);
// })
//上一首
const previousPong = async () => {
    playIndex.value--;
    if (playIndex.value < 0) {
        playIndex.value = playList.value.length - 1;
    }
    await getLyic(playList.value[playIndex.value as keyof typeof playList].id);
    Audio.value.play();
};
//下一首
const nextSong = async () => {
    playIndex.value++;
    if (playIndex.value > playList.value.length - 1) {
        playIndex.value = 0;
    }
    await getLyic(playList.value[playIndex.value as keyof typeof playList].id);
    Audio.value.play();
};
const togglePlay = () => {
    if (isTogglePlay.value) {
        Audio.value.loop = false;
    } else {
        Audio.value.loop = true;
    }
    isTogglePlay.value = !isTogglePlay.value;
};
const handleEnded = async () => {
    if (playIndex.value > playList.value.length - 1) {
        // 如果是最后一曲，重新播放第一曲
        playIndex.value = 0;
        await getLyic(playList.value[playIndex.value as keyof typeof playList].id);
        Audio.value.play();
    } else {
        // 播放下一曲
        playIndex.value++;
        await getLyic(playList.value[playIndex.value as keyof typeof playList].id);
        Audio.value.play();
    }
};
const canplay = () => {
    duration.value = Audio.value.duration;
    lastLick.value = playList.value[playIndex.value as keyof typeof playList].id;
    activeIndex.value = playIndex.value;
};
//调节音量显示
const changeVolume = () => {
    showVolume.value = !showVolume.value;
};
watch(volume, () => {
    if (Audio.value) {
        setVolume();
    }
});
const setVolume = () => {
    if (Audio.value) {
        Audio.value.volume = volume.value / 100;
    }
};
const correctingErrors = async () => {
    if (Audio.value.networkState !== 1) {
        message.error('该歌曲由于版权问题暂时无法播放，为您播放下一首音乐', 2, () => {});
        playIndex.value++;
        await getLyic(playList.value[playIndex.value as keyof typeof playList].id);
        Audio.value.play();
    }
};
</script>
<template>
    <div class="show-bg">
        <div class="show" :style="{ backgroundImage: 'url(' + playList[playIndex].al.picUrl + ')' }" v-show="isshowtab" @mouseenter="showTab" @mouseleave="closTab">
            <div class="show-left"><img :src="playList[playIndex].al.picUrl" title="展开歌曲" /></div>
            <div class="show-center">
                <ul class="ul-b"></ul>
            </div>
            <div class="show-right" @click="bindshow" v-if="Topping"><img src="../../asstes/qguding.png" title="定住" /></div>
            <div class="show-right" @click="bindshow" v-else><img src="../../asstes/guding.png" title="松开" /></div>
        </div>
    </div>
    <div class="container">
        <div class="left" @mouseenter="showTab" @mouseleave="closTab">
            <div @click="changeActive">
                <img class="left-img1" :src="playList[playIndex].al.picUrl" />
            </div>
            <div>
                <h4 class="h4">{{ playList[playIndex].name }}</h4>
                <span class="arname" v-for="arname in playList[playIndex].ar" :key="arname.id">{{ arname.name }}</span>
            </div>
            <div class="hover"><img class="left-img2" src="../../asstes/like.png" title="收藏" /></div>
            <div class="hover"><img class="left-img2" src="../../asstes/unlike.png" title="取消收藏" /></div>
            <div class="hover"><img class="left-img3" src="../../asstes/pinglun.png" title="评论" /></div>
            <div class="hover"><img class="left-img3" src="../../asstes/gengduo.png" title="更多" /></div>
        </div>
        <div class="center">
            <div class="top">
                <div class="hoverb" :class="{ color: isTogglePlay }" @click="togglePlay"><img class="top-img" src="../../asstes/repeat_line.png" title="循环播放" /></div>
                <div class="hoverb" @click="previousPong"><img src="../../asstes/go-end (2).png" title="上一首" /></div>
                <div class="hoverb" v-if="showOpen" @click="play"><img src="../../asstes/pause.png" title="播放歌曲" /></div>
                <div class="hoverb" v-else @click="play"><img src="../../asstes/play.png" title="暂停歌曲" /></div>
                <div class="hoverb" @click="nextSong"><img src="../../asstes/go-end (1).png" title="下一首" /></div>
                <div class="hoverb" @click="changeVolume"><img class="top-img" src="../../asstes/volume.png" title="音量" /></div>
            </div>
            <div class="bottom">
                <div>{{ convertSeconds(currentTime) || '00:00' }}</div>
                <div class="Progress"><div class="Progress-childer" :style="{ width: (1016 / duration) * currentTime + 'px' || 0 }"></div></div>
                <div>{{ convertSeconds(duration) || '00:00' }}</div>
            </div>
        </div>
        <div class="right">
            <div><img class="left-img3" src="../../asstes/moshi.png" title="音乐品质" /></div>
            <div><img class="left-img3" src="../../asstes/yinxiao.png" title="音效" /></div>
            <div><img src="../../asstes/geci.png" title="打开歌词" /></div>
            <div><img src="../../asstes/liebiao.png" title="播放列表" /></div>
        </div>
        <div class="sliderInput" v-show="showVolume">
            <input type="range" min="0" max="100" id="rangeInput" value="1" step="1" v-model="volume" class="custom-range" onchange="document.getElementById('show').innerHTML=value" />
            <div class="div">
                <span id="show"></span>
            </div>
        </div>
    </div>
    <div>
        <audio ref="Audio" :volume="initialVolume" :src="`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`" @timeupdate="setOffSet" @play="changeList" @ended="handleEnded" @canplay="canplay" @error="correctingErrors"></audio>
    </div>
</template>
<style lang="scss" scoped>
.top-img {
    display: none;
}
.hover {
    margin-left: 20px;
    border-radius: 6px;
    cursor: pointer;
}
.hover:hover {
    background: #a4e3ec;
}
.container {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.2), 0 4px 2px rgba(0, 0, 0, 0.2), 0 5px 1px rgba(0, 0, 0, 0.2);
}
.container:hover img {
    display: inline-block;
}
.left {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
    width: 30%;
}
.left-img1 {
    height: 66px;
    width: 66px;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 10px;
}
.left-img1:hover {
    box-shadow: inset rgba(0, 0, 0, 0.6) 0 -3px 8px, inset rgba(252, 255, 255, 0.7) 0 3px 8px, rgba(0, 0, 0, 0.8) 0 3px 8px -3px;
}
.left-img1:hover .show {
    display: inline-block;
}
.left-img2 {
    width: 30px;
    height: 30px;
}
.left-img3 {
    width: 30px;
    height: 30px;
    display: none;
}
.center {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .top img {
        width: 35px;
        height: 35px;
    }
    .top {
        display: flex;
    }
    .hoverb {
        margin: 0 15px;
        border-radius: 8px;
        cursor: pointer;
    }
    .hoverb:hover {
        background: #a4e3ec;
    }
    .bottom {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 28%;
        .Progress {
            width: 80%;
            height: 5px;
            margin: 0 20px;
            background: #cccaca;
        }
        .Progress-childer {
            height: 5px;
            background: rgb(164, 227, 236);
        }
    }
}
.right {
    width: 20%;
    display: flex;
    justify-content: end;
    align-items: center;
    img {
        width: 30px;
        height: 30px;
    }
    div {
        border-radius: 8px;
        margin: 0 10px;
        cursor: pointer;
    }
    div:hover {
        background: rgb(164, 227, 236);
    }
}
.show {
    display: flex;
    width: 20%;
    height: 150px;
    // background: rgba(255,255,255,0);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    position: absolute;
    bottom: 80px;
    left: 20px;
    border-radius: 15px;
    color: black;
    background-repeat: no-repeat;
    background-size: auto;
    animation: rotateBackground 40s linear infinite;
}
.show-left img {
    width: 140px;
    height: 140px;
    margin-left: 5px;
    border-radius: 50%;
    animation-name: rotate;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.show-right {
    position: absolute;
    right: 0;
    font-size: 14px;
}
.show-right:hover {
    background: rgb(164, 227, 236);
}
.show-center {
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    overflow: hidden;
    text-align: center;
    ul {
        list-style: none;
        transition: all 0.5s ease;
        :deep(li) {
            font-weight: 650;
            font-size: 16px;
            line-height: 50px;
            height: 50px;
            transition: all 0.3s ease;
        }
        :deep(.active) {
            transform: scale(1.4);
            color: rgb(4, 140, 161);
        }
    }
}

@keyframes rotateBackground {
    from {
        background-position: 50% 0%;
    }
    to {
        background-position: 50% 100%;
    }
}
.sliderInput {
    top: -136%;
    left: 56.5%;
    width: 200px;
    height: 2rem;
    position: absolute;
    z-index: 99;
    background-color: rgba($color: #000, $alpha: 0.4);
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
        background-color: rgba($color: #ccc, $alpha: 0.3);
        outline: none;
        opacity: 0.7;
        -webkit-transition: opacity 0.75s;
        transition: opacity 0.75s;
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
.div {
    transform: rotate(90deg);
    display: flex;
    font-weight: 550;
    margin-right: 15px;
}
.color {
    background: #a4e3ec;
}
.h4 {
    cursor: default;
    font-size: 25px;
}
.arname {
    cursor: default;
    margin-right: 15px;
    font-size: 20px;
    font-weight: 400;
}
</style>
