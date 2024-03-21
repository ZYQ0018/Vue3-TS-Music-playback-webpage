<script setup lang="ts">
import MusicList from '@/components/MusicList/MusicList.vue'
import { useSongsStore } from '@/stores/songs'
import { onMounted } from 'vue'
const store = useSongsStore()
const getSongList = store.getSongList()
const { songList } = store
onMounted(() => {
  getSongList
})
</script>
<template>
    <div class="container">
        <div class="title" style="margin-bottom: 20px;">
            <h1>最近播放</h1>
        </div>
        <div class="span">
            <span v-for="(index) in 2" :key="index" style="margin-right:50px;">歌曲223</span>
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
    
    <MusicList :songList="songList"></MusicList>
</template>
<style lang="scss" scoped>
.container {
    width: 95%;
    height: 100%;
    margin: 0 auto;
}

.span {
    cursor: pointer;
}

span:hover {
    color: #53b7b4;
}
.button{
    margin: 40px 0;
    display: flex;
    div{
        width: 100px;
        height: 40px;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:999em;
        margin-right: 40px;
    }
    img{
        width: 25px;
        height: 25px;
    }
}
</style>