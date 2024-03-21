import request from '@/request'
//轮播图
export const getBannerList = () => {
    return request.get('/banner?type=0')
}
//每日歌单
export const getPersonalized = () => {
    return request.get('/personalized?limit=30')
}
//获取歌单详情
export const getPlay = (id:any) => {
    return request.get(`/playlist/detail?id=${id}`)
}
//获取歌单所有歌曲
export const getPlayAll = (id:any) => {
    return request.get(`/playlist/track/all?id=${id}&limit=50&offset=1`)
}
//获取歌词
export const getLyric = (id:any) => {
    return request.get(`/lyric?id=${id}`)
}
//获取日推
export const getDaily = () => {
    return request.get('/recommend/songs')
}
//电台
export const getRecommend = () => {
    return request.get('/program/recommend?limit=2')
}
//推荐视频列表
export const getVideo = () => {
    return request.get('/video/timeline/all')
}
//歌单分类
export const getCategory = () => {
    return request.get('/top/playlist?limit=10')
}
//最近播放歌曲
export const getRecentSong = () => {
    return request.get('/record/recent/song?limit=50')
}
//游客登陆
export const getLogin = () => {
    return request.get('/register/anonimous')
}