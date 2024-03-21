import { defineStore } from 'pinia'
import {ref} from 'vue'
import {getLyric} from '@/apis/main'
export const useChangeStore = defineStore('change', ()=>{
  const showOpen = ref(true)
  const currentTime = ref()
  const ended = ref()
  //左边状态栏切换状态
  const activeIndex = ref()
  //播放歌曲id
  const playIndex = ref()
  const playList = ref()
 //播放歌曲
 const Audio = ref()
 function playAudio(e:any){
   Audio.value = e
 }
  const lyric = ref()
 
async function getLyic(id:any) {
   const res = await getLyric(id)
   lyric.value = res.data.lrc
 }
 return {
  activeIndex,
    showOpen,
    playIndex,
    Audio,
    lyric,
    playList,
    currentTime,
    ended,
    playAudio,
    getLyic
 }
},
{
  //持久化配置
  persist: true,
}
)