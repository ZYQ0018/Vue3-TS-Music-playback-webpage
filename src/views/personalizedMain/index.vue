<script setup lang="ts">
import MusicList from '@/components/MusicList/MusicList.vue'
import { useRoute } from 'vue-router';
import { onMounted,ref,watch } from 'vue';
import { useSongsStore } from '@/stores/songs'
import { storeToRefs } from "pinia";
import { getPlayAll } from '@/apis/main'
let id = useRoute().query.id
const store = useSongsStore()
const { PlayList, searchSongList } = storeToRefs(store)
const getPlayList = useSongsStore().getPlayList(id)

//获取歌单所有歌曲
const songList = ref()
const  getPlayAllList = async() =>{
    if(id){
        const res = await getPlayAll(id)
        songList.value = res.data.songs
    }
}
onMounted(async () => {
    getPlayList
    getPlayAllList()
    if(searchSongList.value){
        songList.value = searchSongList.value.songs
    }
})
watch(searchSongList,()=>{
    songList.value = searchSongList.value.songs
})
</script>
<template>
    <div class="container">
        <div class="top" v-if="id">
            <div class="top-left" >
                <img :src="PlayList.coverImgUrl"/>
            </div>           
            <div class="top-right">
                <div class="title">
                    <h2>{{ PlayList.name }}</h2>
                    <span style="margin-right: 8px;margin-top: 5px;">{{ PlayList.creator.nickname }}</span><span style="font-size: 14px;font-weight: 400;">{{ PlayList.description }}</span>
                </div>
                <div class="button">
                    <div>
                    <img src="../../asstes/play.png"/>播放
                </div>
                <div>
                    <img src="../../asstes/xiazai.png"/>下载
                </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span>歌曲</span>
            <span>评论</span>
        </div>
    </div>
    <MusicList :songList="songList"></MusicList>
</template>
<style lang="scss" scoped>
.container {
    width: 75%;
    height: 100%;
    margin: 30px auto;
}
.top{
    display: flex;
    height: 150px;
}
.top-left{
    img{
    width: 150px;
    height: 150px;
    }
}
.top-right{
    transform: translateX(25px);
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.bottom{
    margin: 40px 0;
    span{
        font-size: 20px;
        cursor: pointer;
        margin-right: 88px;
    }
    span:hover {
       color: #53b7b4;
    }
}
.button{
    display: flex;
    cursor: pointer;
    div{
        width: 110px;
        height: 40px;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999em;
        margin-right: 40px;
    }
    img{
        width: 25px;
        height: 25px;
    }
}
</style>