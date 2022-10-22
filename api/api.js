//请求头带token、统一处理code!==200、显示加载中
import http from '@/api/myFetch.js'
import {myFetch} from '@/api/myFetch.js'
//无需对请求头添加token
const httpWithoutToken = new myFetch(false)
//无需对请求添加加载状态(带token)
const httpWithoutLoading = new myFetch(true, false)

import *  as apiPath from "@/api/totalUrl.js";

/**
 * 无需对code!==200进行拦截(且301未登录返回false)
 * 举个例子:
 * export const getRandMusic = (params) => http.get(apiPath.getRandMusic_url, params, configCustom)
 * export const postRandMusic = (params,config) => httpWithoutToken.post(apiPath.getRandMusic_url, params, {...config,...configCustom})
 * */
const configCustom = {custom: {isNeedDealWith: false}}

//请求头带token、统一处理code!==200、显示加载中
export const getRandMusic = (params) => http.get(apiPath.getRandMusic_url, params)
//请求头带token、统一处理code!==200、不显示加载中
// export const postRandMusic = (params,config) => httpWithoutLoading.post(apiPath.getRandMusic_url, params,config)
//请求头不带token、不统一处理code!==200、显示加载中、更改content-type类型(config)
export const postRandMusic = (params, config) => httpWithoutToken.post(apiPath.getRandMusic_url, params, {...config, ...configCustom})
/**
 //请求头不带token、统一处理code!==200、显示加载中
 export const getRandMusic = (params) => httpWithoutToken.get(apiPath.getRandMusic_url, params)
 //请求头带不token、统一处理code!==200、不显示加载中
 export const postRandMusic = (params) => httpWithoutToken.post(apiPath.getRandMusic_url, params)
 //请求头不带token、不统一处理code!==200、显示加载中
 export const getRandMusic = (params) => httpWithoutToken.get(apiPath.getRandMusic_url, params, configCustom)
 //请求头带不token、不统一处理code!==200、不显示加载中
 export const postRandMusic = (params) => httpWithoutToken.post(apiPath.getRandMusic_url, params, configCustom)
 */
