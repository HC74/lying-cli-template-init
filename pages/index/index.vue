<template>
  <View>
    <!-- #ifdef H5  -->
    <div class="logo-content">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/static/img/vite.png" class="logo" alt="logo"/>
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="/static/img/vue.png" class="logo vue" alt="logo"/>
      </a>
    </div>
    <!-- #endif  -->
    <!--  #ifdef APP-VUE || MP-WEIXIN  -->
    <view class="logo-content">
      <navigator url="/pages/index/vueWebsite">
        <image src="/static/img/vite.png" class="logo" alt="logo"></image>
      </navigator>
      <navigator url="/pages/index/vueWebsite">
        <image src="/static/img/vue.png" class="logo"></image>
      </navigator>
    </view>
    <!-- #endif  -->
    <button type="button" @click="state.count++" class="button">count is {{ state.count }}</button>
    <view class="read-the-docs">Click on the Vite and Vue logos to learn more</view>
  </View>
</template>

<script setup>
import {reactive} from 'vue'
import {getRandMusic, postRandMusic} from "@/api/api";

const state = reactive({
  count: 0,
})

const getRandMusicFn = async () => {
  //入参示例
  const params = {
    format: 'mp3',
  }
  //更改请求头示例
  const config = {
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  //post请求示例 此处接口为网上的api 因此成功的code并不为200(或者将myFetch里的成功code更为1) 所以此处实例贴出 失败且不处理的情况
  // 注:如果选择统一处理code!==200当code!==200则当前方法不会继续往下执行
  const res = await postRandMusic(params, config)
  //get请求示例
  // const res = await getRandMusic(params)
  console.log("res>>>>", res)
}

getRandMusicFn()

</script>

<style lang="scss" scoped>
.logo-content {
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  // #ifdef H5
  height: 3em;
  padding: 1.5em;
  // #endif
  //#ifdef MP-WEIXIN
  width: 100rpx;
  height: 100rpx;
  margin: 30rpx;
  // #endif
  will-change: filter;
}

.button {
  width: 300rpx;
  height: 100rpx;
}

.read-the-docs {
  width: 750rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100rpx;
  color: #888;
}
</style>
