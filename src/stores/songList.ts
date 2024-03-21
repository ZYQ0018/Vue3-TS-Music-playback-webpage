import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useSongStore = defineStore('song', ()=>{
const songs = ref()

 return {
   songs,
 }
},{
  //持久化配置
  persist: true,
})