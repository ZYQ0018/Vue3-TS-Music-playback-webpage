import request from '@/request';

//获取key
export const getKey = (time:any) => {
    return request.get(`/login/qr/key?${time}`)
}
//二维码生成接口
export const getQrCode = (key:any,time:any) => {
    return request.get(`/login/qr/create?key=${key}&qrimg=${key}&${time}`)
}
//检测是否扫码登录
export const checkLogin = (key:any,time:any) => {
    return request.get(`/login/qr/check?key=${key}&${time}`)
}
