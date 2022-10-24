import {authorizationKey} from "@/constant/config";

/**
 * authorizationKey:token对应的请求头key
 * @returns {any}
 */

export const getAuthorization = () => {
    return uni.getStorageSync(authorizationKey)
}

export const setAuthorization = (authorization) => {
    return uni.setStorageSync(authorizationKey, authorization)
}

export const removeAuthorization = () => {
    return uni.removeStorageSync(authorizationKey)
}
