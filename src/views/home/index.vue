<script setup lang="ts">
import HomeLeft from '@/components/Homecom/HomeLeft.vue'
import HomeBottom from '@/components/Homecom/HomeBottom.vue'
import HomeTop from '@/components/Homecom/HomeTop.vue'
import Input from '@/components/Input/input.vue'
</script>
<template>
    <div class="top">
        <HomeTop></HomeTop>
    </div>
    <div class="main">
        <div class="left"><HomeLeft /></div>
        <div class="right">
            <Input></Input>
        <div class="center">
            <router-view></router-view>
        </div>
        </div>
    </div>
    <div class="bottom">
        <HomeBottom />
    </div>
</template>
<style scoped lang="scss">
.top{
    position: fixed;
    z-index: 9;
}
.bottom{
    width: 100%;
    height: 7%;
    position: fixed;
    bottom: 0;
    z-index: 999;
}
.left{
    width: 290px;
    height: 100%;
}
.main{
  display: flex;
  width: 100%;
  height: 100%;
}
.right{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.center{
    width: 100%;
    height: 100%;
}
</style>