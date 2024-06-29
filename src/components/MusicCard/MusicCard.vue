<script setup lang="ts">
import { useChangeStore } from '@/stores/change';
import { storeToRefs } from 'pinia';
import { nextTick, ref } from 'vue';
import message from '@/components/msg/msg.ts';
const store = useChangeStore();
const { playIndex, Audio, showOpen, playList } = storeToRefs(store);
const getLyic = store.getLyic;
const lastLick = ref();
const pops = defineProps({
    dayMusic: {
        type: Object,
    },
});
const playAudio = async (item: any, index: any) => {
    playIndex.value = index;
    playList.value = pops.dayMusic;
    await getLyic(item.id);
    if (lastLick.value !== item.id) {
        Audio.value.pause();
        play();
        if (Audio.value.networkState !== 1) {
            message.error('该歌曲由于版权问题暂时无法播放，请播放下一首音乐', 2, () => {});
        }
    } else {
        play();
        if (Audio.value.networkState !== 1) {
            message.error('该歌曲由于版权问题暂时无法播放，请播放下一首音乐', 2, () => {});
            showOpen.value = false;
        }
    }
    lastLick.value = item.id;
};
const play = () => {
    showOpen.value = !showOpen.value;
    if (Audio.value.paused) {
        nextTick(() => {
            Audio.value.play();
        });
    } else {
        Audio.value.pause();
    }
};
</script>
<template>
    <div class="container">
        <div class="div" v-for="(item, index) in pops.dayMusic" :key="item.id" @click="playAudio(item, index)">
            <div class="div-left">
                <img class="img" :src="item.al.picUrl" />
                <span class="details">
                    <span class="details-title" :title="item.name">{{ item.name }}</span>
                    <span class="detaile-singer">
                        <span class="detaile-singerName" v-for="namelist in item.ar" :key="namelist.id">{{ namelist.name }}</span>
                    </span>
                </span>
            </div>
            <div class="div-right">
                <img src="../../asstes/like.png" />
                <img src="../../asstes/gengduo.png" />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
    .div {
        flex: 0 1 33%;
        height: 33%;
        display: flex;
        justify-content: space-between;
        transition: all 0.2s ease;
        border-radius: 10px;
        .div-left {
            margin-left: 5px;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .img {
                width: 15%;
                height: 80%;
                margin-right: 10px;
                border-radius: 10%;
            }
            .details {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .details-title {
                    width: 270px;
                    font-size: 23px;
                    letter-spacing: 0.2px;
                    white-space: nowrap; /* 防止文字换行 */
                    overflow: hidden; /* 隐藏超出容器的内容 */
                    text-overflow: ellipsis; /* 使用省略号表示被截断的文字 */
                }
                .detaile-singer {
                    display: flex;
                    .detaile-singerName {
                        font-size: 20px;
                        color: #6d6a6a;
                        margin-right: 10px;
                        letter-spacing: 0.2px;
                    }
                }
            }
        }
        .div-right {
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                margin-right: 20px;
                width: 50%;
                height: 33%;
            }
        }
    }
}
.div:hover {
    background-color: #f2f2f2;
}
.div:hover .div-right {
    opacity: 1;
}
</style>
