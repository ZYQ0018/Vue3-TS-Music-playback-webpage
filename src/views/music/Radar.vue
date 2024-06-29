<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { getCategory } from '@/apis/main';
import { onMounted, ref } from 'vue';
const { y } = useScroll(window);
const CategoryList = ref();
const getCategoryList = async () => {
    const res = await getCategory();
    CategoryList.value = res.data.playlists;
    console.log(CategoryList.value);
};
onMounted(() => {
    getCategoryList();
});
</script>
<template>
    <div class="span1" :class="{ show: y > 120 }">
        <span v-for="index in 9" :key="index">热门</span>
    </div>
    <div class="container">
        <div class="main">
            <div>
                <h1>全部分类</h1>
            </div>
            <div class="span">
                <span v-for="index in 9" :key="index">热门</span>
            </div>
            <div class="card">
                <div class="card-list" v-for="item in CategoryList" :key="item.id">
                    <img :src="item.coverImgUrl" />
                    <div class="img1">
                        <img src="../../asstes/tabplay.png" />
                    </div>
                    <div class="detail">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
}
.main {
    width: 78%;
    height: 100%;
    margin: 0 auto;
    h1 {
        margin-bottom: 25px;
    }
}
.card {
    width: 100%;
    height: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
.card-list {
    width: 13%;
    height: 13%;
    display: flex;
    position: relative;
    flex-direction: column;
    font-size: 13px;
    text-align: center;
    margin: 10px;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: pointer;
    }
}
.img1 {
    position: absolute;
    top: 30%;
    left: 35%;
    opacity: 0;
    transition: all 0.2s ease;
    img {
        width: 70px;
        height: 70px;
    }
}
.card-list:hover .img1 {
    opacity: 1;
}
.span1 {
    width: 0;
    height: 0;
    opacity: 0;
    font-size: 20px;

    span {
        margin-right: 60px;
        cursor: pointer;
    }
    &.show {
        width: 75%;
        // transition: all .2s ease;
        transform: none;
        position: fixed;
        top: 37px;
        z-index: 999;
        left: 17%;
        height: 40px;
        line-height: 40px;
        background: linear-gradient(to bottom, #d8fbf9, #fff6f6);
        border-radius: 10px;
        opacity: 1;
        span:first-child {
            margin-left: 79px;
        }
    }
}
.span {
    cursor: pointer;
    margin-bottom: 50px;
    span {
        margin-right: 60px;
        cursor: pointer;
    }
}
span:hover {
    color: #53b7b4;
}
.detail {
    width: 100%;
    font-size: 22px;
    overflow: hidden; /* 隐藏超出容器的内容 */
    line-height: 1.2em; /* 设置行高 */
    max-height: 2.4em; /* 设置最大高度为两行的高度 */
    word-wrap: break-word; /* 允许在单词内换行 */
}
</style>
