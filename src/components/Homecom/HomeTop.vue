<script setup lang="ts">
import { useCacheStore } from '@/stores/noCache'

import { storeToRefs } from "pinia"
import { getKey, getQrCode } from '@/apis/login'

const store = useCacheStore()
const { showLogin, img } = storeToRefs(store)
const goLogin = async () => {
    const time = new Date()
    showLogin.value = true
    const key = await getKey(time)
    const res = await getQrCode(key,time)
    img.value = res.data.data.qrimg
}

</script>
<template>
    <div class="top">
                <div class="left">
                    <div><img src="../../asstes/top-left.png" title="后退"/></div>
                    <div><img src="../../asstes/top-right.png" title="前进"/></div>
                    <div><img src="../../asstes/listen.png" title="听歌识曲"/></div>
                </div>
                <div class="right">
                    <div class="div1" @click="goLogin"><img style="height: 30px; width: 30px; border-radius: 50px;" src="../../asstes/main.jpg" title="头像"/><span>xxxxx</span></div>
                    <div><img src="../../asstes/mini.png" title="最小化"/></div>
                    <div><img src="../../asstes/theme.png" title="主题"/></div>
                    <div><img src="../../asstes/setting.png" title="设置"/></div>
                    <div><img src="../../asstes/minis.png" title="最小化"/></div>
                    <div><img src="../../asstes/changenum.png" title="还原"/></div>
                    <div><img src="../../asstes/close.png" title="关闭"/></div>
                </div>
        </div>
</template>
<style lang="scss" scoped>
.top{
    width: 100%;
    height: 3%;
    background: linear-gradient(to top,#d8fbf9, #ffeeee);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        margin-left: 280px;
        display: flex;
        height: 100%;
        align-items: center;
        div{
            margin: 0 12px;
            cursor:pointer;
            img{
            width: 30px;
            height: 30px;
        }
        }
        div:hover{
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }
}
.right{
    display: flex;
    justify-content: center;
    align-items: center;
    .div1{
    box-shadow: none;
    margin-right: 20px; 
    display: flex;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }
    div{
        border-radius: 5px;
        margin: 0 10px;
        display: flex;
        justify-content: center;
        cursor:pointer;
        span{
            margin-left: 5px;
        }
    }
    div:hover{
         box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    }
       img{
        margin: auto;
        width: 22px;
        height: 22px;
       }
    }
}
</style>