/**
 *  QQ:893841819(一世長安)
 *  QQ:1792096481(每天至少八杯水ด้้้้)
 *  QQ群1:511959060
 *  QQ群2:499235384
 *  版权归:一世長安与每天至少八杯水ด้้้้共有
 *  可商用可二开但代码内需注明出处
 * */
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
// main.js
import uviewPlus from '@/uni_modules/uview-plus'
import App from './App.vue'
import dayjs from "dayjs";
import {createPinia} from 'pinia'

const pinia = createPinia();

export function createApp() {
    const app = createSSRApp(App)
    app.use(uviewPlus).use(pinia)
    app.provide('dayjs', dayjs)
    return {
        app
    }
}

// #endif
