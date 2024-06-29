<script setup lang="ts">
const pops = defineProps({
    Personalized: {
        type: Object,
    },
});
</script>
<template>
    <div class="body">
        <div class="container" v-for="(item, index) in pops.Personalized" :key="index">
            <router-link :to="{ path: 'Detail', query: { id: item.id } }">
                <div class="top">
                    <div class="imgall">
                        <img class="img1" :src="item.picUrl" />
                        <div class="toast"><img class="img2" src="../../asstes/tabplay.png" /></div>
                    </div>
                </div>
                <div class="bottom" :title="item.name">
                    {{ item.name }}
                </div>
            </router-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.container {
    flex: 0 1 18%;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    a {
        width: 100%;
        height: 100%;
    }
    .top {
        width: 100%;
        height: 90%;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
        border-radius: 4%;
        transition: all 0.3s ease;
        z-index: 3;
        .imgall {
            width: 100%;
            height: 100%;
        }
        .img1 {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
            border-radius: 4%;
        }
        .toast {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: 0.2);
            z-index: 3;
            display: none;
            border-radius: 4%;
        }
        .img2 {
            top: 35%;
            left: 40%;
            position: absolute;
            width: 20%;
            height: 22%;
        }
    }
}
.imgall:hover .toast {
    display: block;
}
.imgall {
    z-index: 3;
}
.top:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
}
.bottom {
    font-size: 25px;
    width: 300px;
    transform: translateY(10px);
    overflow: hidden;
    line-height: 1.2em;
    max-height: 2.4em;
    word-wrap: break-word;
    text-overflow: ellipsis;
}
</style>
