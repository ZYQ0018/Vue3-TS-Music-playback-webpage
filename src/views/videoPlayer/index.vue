<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVideoLink, getVideoMain } from '@/apis/video';
import { useRoute } from 'vue-router';
const videoDescription = ref();
let vid = useRoute().query.vid;
const vurl = ref();
const initialVolume = ref(0.01);
interface Props {
    src: string;
    poster?: string;
    second?: number;
    width?: number;
    height?: number;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    showPlay?: boolean;
    fit?: 'none' | 'fill' | 'contain' | 'cover';
}
const props = withDefaults(defineProps<Props>(), {
    src: '',
    poster: '',
    second: 1,
    width: 100,
    height: 80,
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,

    preload: 'metadata',
    showPlay: true,
    fit: 'contain',
});
const veoPoster = ref(props.poster);
const originPlay = ref(true);
const hidden = ref(false); // 是否隐藏播放器中间的播放按钮
// 为模板引用标注类型
const veo = ref();

function getPoster() {
    veo.value.currentTime = props.second;
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // canvas画图
    canvas.width = veo.value.videoWidth;
    canvas.height = veo.value.videoHeight;
    ctx?.drawImage(veo.value, 0, 0, canvas.width, canvas.height);
    // 把canvas转成base64编码格式
    veoPoster.value = canvas.toDataURL('image/png');
}
function onPlay() {
    if (originPlay.value) {
        veo.value.currentTime = 0;
        originPlay.value = false;
    }
    if (props.autoplay) {
        veo.value?.pause();
    } else {
        hidden.value = true;
        veo.value?.play();
    }
}
function onPause() {
    hidden.value = false;
}
function onPlaying() {
    hidden.value = true;
}
onMounted(async () => {
    if (props.autoplay) {
        hidden.value = true;
        originPlay.value = false;
    }
    const res = await getVideoLink(vid);
    vurl.value = res.data.urls[0].url;
    const videoMain = await getVideoMain(vid);
    videoDescription.value = videoMain.data;
    console.log(videoDescription.value);
});
</script>
<template>
    <div class="container">
        <div class="m-video" :class="{ 'u-video-hover': !hidden }" :style="`width: ${width}%; height: ${height}%;`">
            <video ref="veo" :style="`object-fit: ${fit};`" :src="`${vurl}`" :poster="`${vurl}`" :autoplay="autoplay" :controls="!originPlay && controls" :loop="loop" :muted="autoplay || muted" :volume="initialVolume" :preload="preload" crossorigin="anonymous" @loadedmetadata="poster ? () => false : getPoster()" @pause="showPlay ? onPause() : () => false" @playing="showPlay ? onPlaying() : () => false" @click.prevent.once="onPlay" v-bind="$attrs"></video>
            <span v-show="originPlay || showPlay" class="m-icon-play" :class="{ hidden: hidden }">
                <svg class="u-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                    <path
                        d="M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z"
                    ></path>
                </svg>
            </span>
        </div>
        <div class="footer" v-for="(item, index) in videoDescription" :key="index">
            <div class="footer-left">
                <div class="title">{{ item.title }}</div>
                <div class="description">
                    <span class="descrip">{{ item.description }}</span>
                    <span class="playTime">{{ item.playTime + '次播放' }}</span>
                </div>
            </div>
            <div class="footer-right">
                <div class="card" style="margin-left: 0">
                    <img src="../../asstes/thumbs.png" />
                    <span>点赞 ({{ item.praisedCount }})</span>
                </div>
                <div class="card">
                    <img src="../../asstes/pinglun.png" />
                    <span>评论 ({{ item.commentCount }})</span>
                </div>
                <div class="card">
                    <img src="../../asstes/like.png" />
                    <span>收藏 ({{ item.subscribeCount }})</span>
                </div>
                <div class="card">
                    <img src="../../asstes/share.png" />
                    <span>分享 ({{ item.shareCount }})</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: absolute;
    width: 90%;
    height: 100vh;
    top: 13%;
}
.container > :nth-child(2),
.container > :nth-child(4) {
    display: none;
}
.m-video {
    width: 100%;
    height: 100vh;
    display: inline-block;
    position: relative;
    background: #000;
    cursor: pointer;
    video {
        width: 100%;
        height: 100%;
    }

    .m-icon-play {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        pointer-events: none;
        transition: background-color 0.3s;

        .u-svg {
            display: inline-block;
            fill: #fff;
            width: 29px;
            height: 34px;
            margin-top: 23px;
            margin-left: 27px;
        }
    }

    .hidden {
        opacity: 0;
    }
}

.u-video-hover {
    &:hover {
        .m-icon-play {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
}
.footer {
    transform: translateX(40px);
    .footer-left {
        margin: 20px 0;
        .title {
            font-size: 25px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .description {
            color: #a5a5a5;
            font-size: 15px;
            .descrip {
                margin-right: 20px;
            }
        }
    }
    .footer-right {
        display: flex;
        img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        .card {
            width: 170px;
            height: 40px;
            margin: 0 30px;
            background-color: #efefef;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 999em;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        }
    }
}
</style>
