import request from "@/request";
//获取视频链接
export const getVideoLink = (id:any) => {
  return request.get(`/video/url?id=${id}`);
}
//获取视频链接
export const getVideoMain = (id:any) => {
  return request.get(`/video/detail?id=${id}`);
}