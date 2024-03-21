import { defineStore } from 'pinia'
import {ref} from 'vue'
import { getPersonalized,getLogin } from '@/apis/main'
import {set} from '@/localhost/token'
export const useMainStore = defineStore('main', ()=>{
  //游客登陆
const login = async () =>{
  const res = await getLogin()
    set(JSON.stringify(res.data.cookie))
}
      //首页数据
const Personalized = ref()
const Personalized1 = ref()
const Personalized2 = ref()
const Personalized3 = ref()
const Personalized4 = ref()
const Personalized5 = ref()
const Personalized6 = ref()
const getPersonalizedList = async () => {
    const res = await getPersonalized()
    Personalized.value = res.data.result
    Personalized1.value = Personalized.value.slice(0,5)
    Personalized2.value = Personalized.value.slice(5,10)
    Personalized3.value = Personalized.value.slice(10,15)
    Personalized4.value = Personalized.value.slice(15,20)
    Personalized5.value = Personalized.value.slice(20,25)
    Personalized6.value = Personalized.value.slice(25,30)
}
    //最近播放
 return {
   Personalized1,
   Personalized2,
   Personalized3,
   Personalized4,
   Personalized5,
   Personalized6,
   getPersonalizedList,
   login,
 }
})