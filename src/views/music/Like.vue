<script setup lang="ts"></script>
<template>
    <div class="slide-left">
        <div class="container">
            <div class="title">
                <h1>喜欢</h1>
            </div>
            <div class="span">
                <span v-for="index in 5" :key="index">歌曲0</span>
            </div>
            <div class="music">
                <img src="../../asstes/shoucang.png" />
                <h2>没有收藏的音乐</h2>
                <button>去逛逛</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 95%;
    height: 100%;
    margin: 0 auto;
}
h1 {
    font-size: 40px;
}
h2 {
    margin-bottom: 20px;
    font-size: 45px;
}
.title {
    margin-bottom: 20px;
}
.music {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 10%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 10%;
        height: 10%;
    }
    button {
        width: 5%;
        height: 40px;
        background-color: #fff;
        border-radius: 20px;
        border: 1px solid black;
        cursor: pointer;
        font-size: 22px;
    }
}
.span {
    cursor: pointer;
    span {
        margin-right: 50px;
        font-size: 28px;
    }
}
span:hover {
    color: #53b7b4;
}
button:hover {
    background-color: #53b7b4;
    color: #fff;
}
.slide-left {
    animation: bounceInLeft 0.1s forwards;
    -webkit-animation: bounceInLeft 0.1s forwards;
    /*Safari and Chrome*/
    // transition: all 2s ease-in-out;
}

@keyframes bounceInLeft {
    0% {
        opacity: 0;
        transform: translate3d(200px, 0, 0);
    }

    40% {
        opacity: 0;
    }
    // 90%{
    //     opacity: 1;
    // }
    100% {
        transform: none;
    }
}
</style>
