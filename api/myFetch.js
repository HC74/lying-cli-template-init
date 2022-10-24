import Request from 'luch-request'
import {getBaseUrl} from "@/constant/config";
import {removeAuthorization} from "@/utils/auth";
// import qs from 'qs'

const BASE_API = getBaseUrl()

class myFetch {
    http = new Request({
        // 全局设置
        baseURL: BASE_API, //设置请求的base url
        timeout: 60000,//60秒请求超时
    });
    constructor(needToken = true, needLoading = true) {
        this.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
            config.header = {
                ...config.header,
                // a: 1 // 演示拦截器header加参
            }
            if (needLoading === true) {
                // 加载状态
                uni.showLoading({
                    title: '加载中',
                    mask: true
                });
            }
            if (needToken) {
                // 添加token
                const token = uni.getStorageSync("token");
                if (token) {
                    //请求头添加Authorization
                    config.header.Authorization = token
                }
            }
            // 演示custom 用处
            // if (config.custom.auth) {
            //   config.header.token = 'token'
            // }
            /**
             /* 演示
             if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
			    return Promise.reject(config)
			  }
             **/
            return config
        }, config => { // 可使用async await 做异步操作
            return Promise.reject(config)
        })

        this.http.interceptors.response.use((response) => {
            if (needLoading === true) {
                uni.hideLoading()
            }
            if (response.statusCode !== 200) { // 服务端返回的状态码不等于200，则reject()
                return Promise.reject(response)
            } // return Promise.reject 可使promise状态进入catch  data.data

            const {data = {}} = response
            const {data: resData, code = -1, message = '请求失败，请重试'} = data

            if (code === 301) {
                if (response.config?.custom?.isNeedDealWith === false) {
                    removeAuthorization()
                    return false
                }
                uni.showModal({
                    title: '温馨提示',
                    content: '您的身份信息已过期,请重新登录',
                    confirmText: "去登录",//这块是确定按钮的文字
                    cancelText: "取消",//这块是取消的文字
                    success: (res) => {
                        if (res.confirm) {
                            //移除过期的token
                            removeAuthorization()
                            //跳转到如登录页
                            // uni.navigateTo({
                            //     url: "/pages/login/login"
                            // })
                        } else if (res.cancel) {
                            //取消

                        }
                    }
                });
                return Promise.reject(response)
            } else if (code !== 200) {
                //当传进来自定义的isNeedDealWith时，发生错误则不在这里对其进行处理而是直接返回出去交由外部自行处理
                if (response.config?.custom?.isNeedDealWith === false) {
                    return response
                }
                uni.showToast({
                    icon: 'none',
                    title: message
                })
                return Promise.reject(response)
            }

            return resData
        }, (response) => {
            console.log("进入错误")
            /*  对响应错误做点什么 （statusCode !== 200）*/
            uni.showToast({
                icon: 'none',
                title: "网络异常,请重试"
            })
            return Promise.reject(response)
        })
    }

    get(url, params = {}, config = {}) {
        // params参数,config请求的可配置项如请求头等(局部优于全局)
        return this.http.get(url, {
            params,
            ...config,
        })
    }

    post(url, params, config = {}) {
        // params参数,config请求的可配置项如请求头等(局部优于全局)
        return this.http.post(url, {
            ...params,
        }, {
            ...config,
        })
    }

}

export default new myFetch()
export {
    myFetch
}
