import { createRouter, createWebHashHistory } from 'vue-router';
import HomeMain from '@/components/Homecom/HomeMain.vue';
import Home from '@/views/home/index.vue';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: 'homemain',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'homemain',
                    component: HomeMain,
                },
                {
                    path: 'like',
                    name: 'Like',
                    component: () => import('@/views/music/Like.vue'),
                },

                {
                    path: 'Audition',
                    name: 'Audition',
                    component: () => import('@/views/music/Audition.vue'),
                },
                {
                    path: 'LeGuan',
                    name: 'LeGuan',
                    component: () => import('@/views/music/LeGuan.vue'),
                },
                {
                    path: 'Local',
                    name: 'Local',
                    component: () => import('@/views/music/Local.vue'),
                },
                {
                    path: 'Radar',
                    name: 'Radar',
                    component: () => import('@/views/music/Radar.vue'),
                },
                {
                    path: 'RecentlyPlayed',
                    name: 'RecentlyPlayed',
                    component: () => import('@/views/music/RecentlyPlayed.vue'),
                },
                {
                    path: 'Video',
                    name: 'Video',
                    component: () => import('@/views/music/Video.vue'),
                },
                {
                    path: 'Detail',
                    name: 'detail',
                    component: () => import('@/views/personalizedMain/index.vue'),
                },
                {
                    path: 'videoPlay',
                    name: 'videoPlay',
                    component: () => import('@/views/videoPlayer/index.vue'),
                },
            ],
        },
    ],
});

export default router;
