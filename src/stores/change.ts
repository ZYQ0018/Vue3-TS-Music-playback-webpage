import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getLyric, getDaily } from '@/apis/main';
import { set } from '@/localhost/playList';

export const useChangeStore = defineStore(
    'change',
    () => {
        const showOpen = ref(true);
        const currentTime = ref();
        const ended = ref();
        //左边状态栏切换状态
        const activeIndex = ref();
        //播放歌曲id
        const playIndex = ref(0);
        const playList = ref();
        //播放歌曲
        const Audio = ref();
        function playAudio(e: any) {
            Audio.value = e;
        }
        const lyric = ref();

        async function getLyic(id: any) {
            const res = await getLyric(id);
            lyric.value = res.data.lrc;
        }
        const getDailyList = async () => {
            const res = await getDaily();
            playList.value = res.data.data.dailySongs;
            playIndex.value = 0;
            set(JSON.stringify(res.data.data.dailySongs));
        };
        return {
            activeIndex,
            showOpen,
            playIndex,
            Audio,
            lyric,
            playList,
            currentTime,
            ended,
            playAudio,
            getLyic,
            getDailyList,
        };
    },
    {
        //持久化配置
        persist: true,
    }
);
