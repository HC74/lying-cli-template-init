<template>
  <View class="lying_app_card">
    首页
  </View>
</template>

<script setup>
import {ref} from 'vue'
import {getRandMusic, postRandMusic} from "@/api/api";
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

</style>
