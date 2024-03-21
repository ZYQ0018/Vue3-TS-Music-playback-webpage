<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getVideoLink, getVideoMain } from '@/apis/video'
import { useRoute } from 'vue-router';
const videoDescription = ref()
let vid = useRoute().query.vid
const vurl = ref()
const initialVolume = ref(0.01)
interface Props {
    src: string // 视频文件地址，支持网络地址 https 和相对地址
    poster?: string // 视频封面地址，支持网络地址 https 和相对地址
    second?: number // 在未设置封面时，自动截取视频第 second 秒对应帧作为视频封面
    width?: number // 视频播放器宽度，单位px
    height?: number // 视频播放器高度，单位px
    autoplay?: boolean // 视频就绪后是否马上播放，优先级高于preload
    controls?: boolean // 是否向用户显示控件，比如进度条，全屏等
    loop?: boolean // 视频播放完成后，是否循环播放
    muted?: boolean // 是否静音
    preload?: 'auto' | 'metadata' | 'none' // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略
    showPlay?: boolean // 播放暂停时是否显示播放器中间的暂停图标
    fit?: 'none' | 'fill' | 'contain' | 'cover' // video的poster默认图片和视频内容缩放规则
}
const props = withDefaults(defineProps<Props>(), {
    src: '',
    poster: '',
    second: 1,
    width: 100,
    height: 80,
    /*
      参考 MDN 自动播放指南：https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide
      Autoplay 功能
      据新政策，媒体内容将在满足以下至少一个的条件下自动播放：
      1.音频被静音或其音量设置为 0
      2.用户和网页已有交互行为（包括点击、触摸、按下某个键等等）
      3.网站已被列入白名单；如果浏览器确定用户经常与媒体互动，这可能会自动发生，也可能通过首选项或其他用户界面功能手动发生
      4.自动播放策略应用到<iframe>或者其文档上
      autoplay：由于目前在最新版的Chrome浏览器（以及所有以Chromium为内核的浏览器）中，
      已不再允许自动播放音频和视频。就算你为video或audio标签设置了autoplay属性也一样不能自动播放！
      解决方法：设置视频 autoplay 时，视频必须设置为静音 muted: true 即可实现自动播放，
      然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑
    */
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    /*
      preload可选属性：
      auto: 一旦页面加载，则开始加载视频;
      metadata: 当页面加载后仅加载视频的元数据（例如长度），建议使用metadata，以便视频自动获取第一帧作为封面poster
      none: 页面加载后不应加载视频
    */
    preload: 'metadata',
    showPlay: true,
    /*
      fit可选属性：
      none: 保存原有内容，不进行缩放;
      fill: 不保持原有比例，内容拉伸填充整个内容容器;
      contain: 保存原有比例，内容以包含方式缩放;
      cover: 保存原有比例，内容以覆盖方式缩放
    */
    fit: 'contain'
})
// 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video
const veoPoster = ref(props.poster)
const originPlay = ref(true)
const hidden = ref(false) // 是否隐藏播放器中间的播放按钮
// 为模板引用标注类型
const veo = ref()
// const veo = ref<HTMLVideoElement | null>(null) // 声明一个同名的模板引用

/*
  loadeddata 事件在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发
  preload为none时不会触发
*/
function getPoster() { // 在未设置封面时，自动截取视频0.5s对应帧作为视频封面
    // 由于不少视频第一帧为黑屏，故设置视频开始播放时间为0.5s，即取该时刻帧作为封面图
    veo.value.currentTime = props.second
    // 创建canvas元素
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // canvas画图
    canvas.width = veo.value.videoWidth
    canvas.height = veo.value.videoHeight
    ctx?.drawImage(veo.value, 0, 0, canvas.width, canvas.height)
    // 把canvas转成base64编码格式
    veoPoster.value = canvas.toDataURL('image/png')
}
function onPlay() {
    if (originPlay.value) {
        veo.value.currentTime = 0
        originPlay.value = false
    }
    if (props.autoplay) {
        veo.value?.pause()
    } else {
        hidden.value = true
        veo.value?.play()
    }
}
function onPause() {
    hidden.value = false
}
function onPlaying() {
    hidden.value = true
}
onMounted(async () => {
    if (props.autoplay) {
        hidden.value = true
        originPlay.value = false
    }
    const res = await getVideoLink(vid)
    vurl.value = res.data.urls[0].url
    const videoMain = await getVideoMain(vid)
    videoDescription.value =  videoMain.data   
    console.log(videoDescription.value);
    
    /*
      自定义设置播放速度，经测试：
      在vue2中需设置：this.$refs.veo.playbackRate = 2
      在vue3中需设置：veo.value.defaultPlaybackRate = 2
    */
    // veo.value.defaultPlaybackRate = 2
})
</script>
<template>
    <div class="container">
    <div class="m-video" :class="{ 'u-video-hover': !hidden }" :style="`width: ${width}%; height: ${height}%;`">
        <video ref="veo" :style="`object-fit: ${fit};`" :src="`${vurl}`" :poster="`${vurl}`" 
            :autoplay="autoplay" :controls="!originPlay && controls" :loop="loop" :muted="autoplay || muted" :volume="initialVolume"
            :preload="preload" crossorigin="anonymous" @loadedmetadata="poster ? () => false : getPoster()"
            @pause="showPlay ? onPause() : () => false" @playing="showPlay ? onPlaying() : () => false"
            @click.prevent.once="onPlay" v-bind="$attrs">
        </video>
        <span v-show="originPlay || showPlay" class="m-icon-play" :class="{ 'hidden': hidden }">
            <svg class="u-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                <path d="M28.26,11.961L11.035,0.813C7.464-1.498,3,1.391,3,6.013v21.974c0,4.622,4.464,7.511,8.035,5.2L28.26,22.039
          C31.913,19.675,31.913,14.325,28.26,11.961z"></path>
            </svg>
        </span>
    </div>
    <div class="footer" v-for="(item,index) in videoDescription" :key="index">
        <div class="footer-left">
            <div class="title">{{item.title}}</div>
            <div class="description">
                <span class="descrip">{{ item.description }}</span>
                <span class="playTime">{{item.playTime + '次播放'}}</span>
            </div>
        </div>
        <div class="footer-right">
            <div class="card" style="margin-left: 0;">
                <img src="../../asstes/thumbs.png"/>
                <span>点赞 ({{item.praisedCount }})</span>
            </div>
            <div class="card">
                    <img src="../../asstes/pinglun.png" />
                    <span>评论 ({{item.commentCount }})</span>
            </div>
            <div class="card">
                    <img src="../../asstes/like.png"/>
                    <span>收藏 ({{item.subscribeCount }})</span>
            </div>
            <div class="card">
                    <img src="../../asstes/share.png"/>
                    <span>分享 ({{item.shareCount }})</span>
            </div>
        </div>
    </div>
    </div>
</template>
<style lang="less" scoped>
.container{
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
    video{
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
        background-color: rgba(0, 0, 0, .6);
        pointer-events: none;
        transition: background-color .3s;

        .u-svg {
            display: inline-block;
            fill: #FFF;
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
            background-color: rgba(0, 0, 0, .7);
        }
    }
}
.footer{
    transform: translateX(40px);
    .footer-left{
        margin: 20px 0;
        .title{
            font-size: 25px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .description{
            color: #a5a5a5;
            font-size: 15px;
            .descrip{
                margin-right: 20px;
            }
        }
    }
    .footer-right{
        display: flex;
        img{
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
        .card{
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