<script setup lang="ts">
const pops = defineProps({
    RecommendList: {
        type: Object
    }
})
</script>
<template>
    <div class="container">
        <div class="left" v-for="(item) in pops.RecommendList" :key="item.id">
            <div class="top">
            <div class="title">
                <h1 style="margin-bottom: 4%;">{{ item.channels }}</h1>
                <h3 style="width: 50%;line-height: 40px;">{{item.name}}</h3>
            </div>
            <div class="imgall">
                    <img class="img1" :src="item.blurCoverUrl" />
                    <div class="toastshow">
                    <img class="img2" src="../../asstes/tabplay.png" />
                    </div>
            </div> 
        </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .left{
        width: 42%;
        height: 100%;
        border-radius: 8%;
        z-index: 2;
        transition: all .5s ease;
        cursor:pointer;
    }
    .left:hover {
        box-shadow:  0 15px 30px rgba(0,0,0,.2);
    }
    .top{
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom right,#a1e9e5, #fff);
        border-radius: 8%;
        display: flex;
        .img1{
            position: absolute;
            top: 8%;
            right: 6%;
            width: 40%;
            height: 80%;
            border-radius: 5%;
            box-shadow:  0 15px 30px rgba(0,0,0,.5);
            z-index: 0;
        }
        .toastshow{
            position: absolute;
            top: 8%;
            right: 6%;
            width: 40%;
            height: 80%;
            border-radius: 5%;
            background-color:rgba($color: #000000, $alpha: 0.3); 
            z-index: 1;
            visibility: hidden;
        }
        .img2{
            position: absolute;
            top: 35%;
            right: 38%;
            width: 20%;
            height: 25%;
        }
    }
    .bottom{
        font-size: 15px;
         text-align: center;
    }
    .title{
        margin-left: 10%;
        margin-top: 5%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}
    .imgall:hover .toastshow{
        transition-delay: .1s;
         visibility: visible ; 
        }
        .imgall{
            z-index: 2;
        }
</style>