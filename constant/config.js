/**
 * authorizationKey:token对应的请求头key
 */
export const authorizationKey = 'token'

/**
 * 根据环境变量判断自动返回BASE_URL
 * development:开发环境
 * prodution:生产环境
 * @returns {string}
 */
export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        //开发环境
        // return "https://lying-demo.com/dev"

        /**
         * 注:一、二方式取一种
         * */
        // 一、完整路径(微信小程序必须完整路径)
        return "https://api.uomg.com/api"
        // 二、或者加前缀如api再去vite.config.js里开启跨域(H5可选择此方法)
        // // #ifndef H5
        // return 'apiDev'
        // // #endif

    } else if (process.env.NODE_ENV === 'production') {
        //生产环境
        return "https://lying-demo.com/pro"
    } else {
        //其他环境
    }
}
