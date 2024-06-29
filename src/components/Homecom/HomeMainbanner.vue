<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue';
const slider = ref();
let current = ref(0);
const change = () => {
    nextTick(() => {
        const left = (current.value - 1 + slider.value.children.length) % slider.value.children.length;
        const right = (current.value + 1) % slider.value.children.length;
        Array.from(slider.value.children).forEach((item: any) => {
            item.className = 'slider_item';
        });
        slider.value.children[left].className = 'slider_item left';
        slider.value.children[current.value].className = 'slider_item center';
        slider.value.children[right].className = 'slider_item right';
    });
};
const next = () => {
    nextTick(() => {
        current.value = (current.value + 1) % slider.value.children.length;
        change();
    });
};
const pre = () => {
    nextTick(() => {
        current.value = (current.value + slider.value.children.length - 1) % slider.value.children.length;
        change();
    });
};
const settime = setInterval(() => {
    next();
}, 5000);
onBeforeUnmount(() => {
    clearInterval(settime);
});
</script>
<template>
    <div class="container">
        <div class="slider" ref="slider">
            <div class="slider_item left">
                <img src="http://p1.music.126.net/GOBlaGwC8ZqzQmgFuDBR3g==/109951169390735002.jpg" />
            </div>
            <div class="slider_item center">
                <img src="http://p1.music.126.net/m1FeItqexnZmnl_FClPjRQ==/109951169390736588.jpg" />
            </div>
            <div class="slider_item right">
                <img src="http://p1.music.126.net/MKMnDS-VMvQ5Y5ju7IwBPQ==/109951169390738941.jpg" />
            </div>
            <div class="slider_item">
                <img src="http://p1.music.126.net/ic7cpgjxD765X5gqOIh0Uw==/109951169390750619.jpg" />
            </div>
        </div>
        <!-- <div class="menu">
        <span class="btn btn_pre" @click="pre()">
         <img src="../../asstes/wleft.png"/>
        </span>
          <span class="btn btn_next" @click="next()">
            <img src="../../asstes/wright.png"/>
          </span>
       </div> -->
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.slider {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.slider_item {
    transition: all 0.8s ease-in-out;
    width: 500px;
    position: absolute;
    overflow: hidden;
    border-radius: 16px;
    z-index: 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.slider_item img {
    width: 100%;
    display: block;
}
.slider_item.left {
    transform: translateX(-250px);
    z-index: 1;
}

.slider_item.center {
    width: 600px;
    z-index: 2;
}

.slider_item.right {
    transform: translateX(250px);
    z-index: 1;
}
.menu {
    width: 100%;
    height: 50px;
    position: absolute;
    z-index: 1;
}
.btn_pre {
    position: absolute;
    left: 0;
}
.btn_next {
    position: absolute;
    right: -20%;
}
.btn img {
    width: 20%;
    height: 20%;
    background-color: rgba($color: #000000, $alpha: 0.3);
    border-radius: 50%;
    cursor: pointer;
}
</style>
