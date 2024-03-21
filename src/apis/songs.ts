import request from '@/request'
//本地歌单
export const getPersonalized = () => {
  return request.get('/recommend/songs')
}
//最近播放
export const getRecentPlay = () => {
    return request.get('/record/recent/song?limit=100')
}
//热搜列表
export const getHot = () => {
  return request.get('/search/hot/detail')
}
//搜索建议
export const getSuggest = (value:any) => {
  return request.get(`/search/suggest?keywords=${value}`)
}
//搜索歌曲
export const getSearch = (value:any) => {
  return request.get(`/cloudsearch?keywords=${value}`)
}
