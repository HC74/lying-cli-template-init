<script>
import routingIntercept from '@/utils/router-intercept.js'

export default {
  onLaunch: function () {
    // #ifdef MP-WEIXIN
    console.log("wx")
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {

      // 请求完新版本信息的回调

      console.log(res.hasUpdate)

    })

    updateManager.onUpdateReady(function () {

      wx.showModal({

        title: '更新提示',

        content: '新版本已经准备好，是否重启应用？',

        success: function (res) {

          if (res.confirm) {

            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启

            updateManager.applyUpdate()

          }

        }

      })

    })

    updateManager.onUpdateFailed(function () {

      // 新的版本下载失败

      wx.showModal({

        title: '更新提示',

        content: '新版本下载失败',

        showCancel: false

      })

    })

    //  #endif

  },
  onShow: function () {
    routingIntercept()
  },
  onHide: function () {
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-plus/index.scss";
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/css/customicons.css';
// 设置整个项目的背景色
page {
  background-color: rgb(243, 243, 245);
  height: 100%;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}

//自定义的全局样式
@import "@/static/css/main.css";
</style>
