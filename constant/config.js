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
        return "https://api.uomg.com/api"
    } else if (process.env.NODE_ENV === 'production') {
        //生产环境
        return "https://lying-demo.com/pro"
    } else {
        //其他环境
    }
}
