<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCacheStore } from '@/stores/noCache'
import { useSongsStore } from '@/stores/songs'
import {ref,onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { getSuggest } from '@/apis/songs'
let router = useRouter();
const value = ref()
const store = useCacheStore()
const store1 = useSongsStore()
const getHotList = store.getHotList
const { hotList } = storeToRefs(store)
const { searchStore } = storeToRefs(store1)
const getSearchSongList = store1.getSearchSongList
let timer = ref()
const suggest = ref()
const table = ref(false)
const songList = ref([{'name':'单曲'}, { 'name': '歌手' },{ 'name': '专辑' }])
const changeSearchWord = ref()
onMounted(()=>{
    getHotList()  
    document.addEventListener('click', closeIfNotElement);
})
const changeValue = (value:any) => {
    if(timer.value != null){
        clearTimeout(timer.value)
        timer.value = null
    } 
    timer.value = setTimeout(async () => {
        const res = await getSuggest(value)
            suggest.value = res.data.result          
    }, 700);   
}
const getSearchSong = async () =>{
        await getSearchSongList(value.value)
    if(value.value){
        const index = searchStore.value.indexOf(value.value)
        if(index !== -1){
            searchStore.value.splice(index,1)
        }
        searchStore.value.unshift(value.value)
        router.replace({ path:'Detail'})
    }else{
        return alert('请输入搜索内容')
    }
}
const focus = () => {
    table.value = true
}
const search = async (searchWord:any) => {
    if (searchWord) {
        changeSearchWord.value = searchWord
        const index = searchStore.value.indexOf(searchWord)
        if (index !== -1) {
            searchStore.value.splice(index, 1)
        }
        searchStore.value.unshift(searchWord)
        await getSearchSongList(searchWord)
        router.replace({ path: 'Detail' })
    }
}
const closeIfNotElement = (event:any) => {
    if (!event.target.closest('.body')) {
        table.value = false;
    }
}
</script>
<template>
    <div class="body">
    <div class="center">
            <div class="center-top">
                <div class="center-top-main">
                    <input class="input" v-model="value" @input="changeValue(value)" @focus="focus"/>
                    <button @click="getSearchSong"><img src="../../asstes/search.png"/></button>
                </div>
                <div class="center-bottom" v-show="table" v-if="!suggest">
                    <div class="bottom-left">
                            <div>热门搜索</div>
                            <ul>
                                <li v-for="(item) in hotList" :key="item.id" @click.stop="search(item.searchWord)">
                                <span>{{ item.searchWord }}</span>
                                <span>{{ item.score / 10000 }}万</span>
                                </li>
                            </ul>
                    </div>
                    <div class="bottom-right">
                            <div>搜索历史</div>
                            <ul>
                                <li v-for="(item,index) in searchStore" :key="index" @click.stop="search(item)">
                                <span>{{ item }}</span>
                                </li>
                            </ul>
                    </div>
                </div>
                <div  class="center-bottom2" v-if="suggest && table">
                    <div class="list">
                        <div class="title" v-for="(item, index) in songList" :key="index">{{ item.name }}</div>
                    </div>
                    <div class="content">
                        <span class="span" v-for="(songs, index) in suggest.songs" :key="index">{{ songs.name }}-{{ songs.artists[0].name }}</span>
                        <span class="span" v-for="(artists, index) in suggest.artists" :key="index"><span><img :src="artists.img1v1Url"/>{{ artists.name }}</span></span>
                        <span class="span"><span v-for="(albums, index) in suggest.albums" :key="index"><img style="border-radius: 20%;" :src="albums.artist.picUrl"/><span>{{ albums.name }}-{{ albums.artist.name }}</span></span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.body{
    width: 100%;
    height: 100%;
    .center{
    width: 45%;
    display: flex;
    margin: 0 auto;
    margin-top: 80px;
}
.center-top{
    width: 100%;
    height: 100%;
    .center-top-main{
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    background-color: #f6f5f5;
    border-radius: 30px;
    button{
        margin-right: 5px;
        width: 40px;
        height: 40px;
        border: none;
        background-color: #f6f5f5;
        border-radius: 30px;
        cursor:pointer;
        img{
            width: 70%;
            height: 70%;
        }
    }
    .input{
        background-color: #f7f7f7;
        width: 90%;
        height: 50px;
        border: none;
        outline: none;  
    }
    }
    .center-top-main:hover{
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }
}
}
.center-bottom{
    position: absolute;
    top: 130px;
    left: 37.5%;
    background-color: #fff;
    width: 35%;
    height: 500px;
    z-index: 4;
    display: flex;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    li {
        list-style: none;
        height: 43px;
        transform: translateY(10px);
        display: flex;
        justify-content: space-between;
    }
}
.bottom-left{
    flex: 0 1 50%;
    padding: 20px;
    border-right: 1px solid #c1c0c0;
    line-height: 43px;
    overflow: hidden;
    li{
        padding: 5px;
        border-radius: 5%;
    }
    div{
        height: 35px;
        border-bottom:1px solid #c1c0c0; ;
    }
    span:hover {
        background-color: #f0f0f0;
    }
    li:hover {
        background-color: #f0f0f0;
    }
}
.bottom-right{
    flex: 0 1 50%;
    padding: 20px;
    line-height: 43px;
    overflow: hidden;
    li{
        padding: 5px;
        border-radius: 5%;
    }
    div{
        height: 35px;
        border-bottom:1px solid #c1c0c0; ;
    }
        span:hover {
        background-color: #f0f0f0;
    }
    li:hover {
        background-color: #f0f0f0;
    }
}
.center-bottom2{
    position: absolute;
    top: 130px;
    left: 37.5%;
    background-color: #fff;
    width: 15%;
    height: 500px;
    z-index: 4;
    padding: 40px;
    display: flex;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .list{
        transform: translateY(20px);
        width: 80px;

        .title{
        height: 40px;
        }
    }
    .content{
        transform: translateY(20px);
        display: flex;
        flex-direction: column;
        width: 100%;
            .span{
                display: flex;
                flex-direction: column;
                height: 40px;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                span{
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                }
            }
        }
}
span:hover {
    background-color: #fff;
}
</style>