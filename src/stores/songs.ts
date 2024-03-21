import { defineStore } from 'pinia'
import {ref} from 'vue'
import {getPersonalized,getRecentPlay,getSearch} from '@/apis/songs'
import { getPlay } from '@/apis/main'

export const useSongsStore = defineStore('songs', ()=>{
//搜索历史
const searchStore = ref([] as any[]);

const songList = ref()
const getSongList = async () => {
    const res = await getPersonalized()
    songList.value = res.data.data.dailySongs
}
//歌单列表
const PlayList = ref()
const getPlayList = async (id:any) =>{
    const res = await getPlay(id)
    PlayList.value = res.data.playlist 
}
// 最近播放
const RecentPlay = ref()
const getRecentPlayList = async () =>{
  const res = await getRecentPlay()
  RecentPlay.value = res
}
//搜索歌曲
 const searchSongList = ref()
 const getSearchSongList = async (value:any) => {
    const res = await getSearch(value)
    searchSongList.value = res.data.result
 }
 return {
   songList,
   PlayList,
   RecentPlay,
   searchSongList,
   searchStore,
   getSongList,
   getPlayList,
   getSearchSongList,
   getRecentPlayList
 }
},{
  //持久化配置
  persist: true,
})