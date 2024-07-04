import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHot } from '@/apis/songs';
export const useCacheStore = defineStore('noCache', () => {
    //MusicList页面的歌曲动态样式
    const activeIndex = ref();
    //控制双击播放歌曲的bug
    const lastLick = ref();
    //歌曲上下弹框
    const ActiveUp = ref(false);
    const ActiveDown = ref(false);
    function changeActiveUp() {
        if (ActiveDown.value === true) {
            ActiveDown.value = !ActiveDown.value;
        }
        ActiveUp.value = !ActiveUp.value;
    }
    function changeActiveDown() {
        if (ActiveUp.value === true) {
            ActiveUp.value = !ActiveUp.value;
        }
        ActiveDown.value = !ActiveDown.value;
    }
    //登录
    const showLogin = ref(false);
    const img = ref();
    const time = ref();
    //热搜列表
    const hotList = ref();
    const getHotList = async () => {
        const res = await getHot();
        hotList.value = res.data.data.slice(0, 10);
    };
    return {
        ActiveUp,
        ActiveDown,
        showLogin,
        img,
        time,
        hotList,
        lastLick,
        activeIndex,
        changeActiveUp,
        changeActiveDown,
        getHotList,
    };
});
