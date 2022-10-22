/**
 * @description 自定义路由拦截
 */

import {getAuthorization} from '@/utils/auth.js'
// 白名单
const whiteList = [
    '/', // 注意入口页必须直接写 '/'
    // {pattern: /^\/pages\/list.*/}, // 支持正则表达式
    // {pattern: /^\/pages\/guidePage.*/}, // 支持正则表达式
    // '/pages/index/entrance',
    '/pages/login/login',//授权登录

    // {pattern: /^\/pages\/login\/*/}
]

const routerIntercept = () => {
    const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
    // 用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
    list.forEach(item => {
        uni.addInterceptor(item, {
            invoke(e) {
                // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
                const url = e.url.split('?')[0]
                // console.log('url', url,e)

                // 判断当前窗口是白名单，如果是则不重定向路由
                let pass
                if (whiteList) {
                    pass = whiteList.some((item) => {
                        if (typeof (item) === 'object' && item.pattern) {
                            return item.pattern.test(url)
                        }
                        return url === item
                    })
                }

                // 不是白名单并且没有token
                if (!pass && !getAuthorization()) {
                    uni.showModal({
                        title: '温馨提示',
                        content: '您的身份信息已过期,请重新登录',
                        confirmText: "去登录",//这块是确定按钮的文字
                        cancelText: "取消",//这块是取消的文字
                        success: (res) => {
                            if (res.confirm) {
                                //跳转到如登录页
                                // uni.navigateTo({
                                //     url: "/pages/login/login"
                                // })
                            } else if (res.cancel) {

                            }
                        }
                    });
                    // uni.showToast({
                    //     title: '身份信息过期,请重新登录',
                    //     icon: 'none'
                    // })
                    //
                    // uni.navigateTo({
                    //     url: "/pages/login/login"
                    // })
                    return false
                }
                return e
            },
            fail(err) { // 失败回调拦截
                console.log(err)
            }
        })
    })
}


export default routerIntercept
