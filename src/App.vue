<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import gql from 'graphql-tag'
const AV = require('leancloud-storage')
export default {
  provide () {
    return {
      appRoot: this
    }
  },
  data: function () {
    return {
      wxReady: false,
      weixinJsConfigObject: null
    }
  },
  mounted: function () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.initLeanCloud()
      this.initWx()
    },
    async initWx () {
      const url = location.href.split('#')[0]
      const wxConfig = await this.$apollo.provider.defaultClient.query({
        query: gql`
          query weixinJsConfig($url: String!) {
            weixinJsConfig(url: $url) {
              appId
              nonceStr
              timestamp
              signature
            }
          }
        `,
        variables: {
          url
        }
      })
      window.wx.ready(() => {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        // console.log("ready---------------");
        window.wx.checkJsApi({
          jsApiList: ['openAddress'], // 需要检测的 JS 接口列表，所有 JS 接口列表见附录2,
          success: (res) => {
            // 以键值对的形式返回，可用的 api 值true，不可用为false
            // 如：{"checkResult":{"openAddress":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.openAddress) {
              this.wxReady = true
              this.$store.commit('updateItem', { key: 'wxReady', value: true })
            }
          }
        })
      })
      window.wx.error(function (res) {
        if (this.weixinJsConfigObject) {
          this.weixinJsConfigObject.set('wxError', res)
          this.weixinJsConfigObject.save()
        }
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })

      const { __typename, ...weixinJsConfig } = wxConfig.data.weixinJsConfig
      // console.log('weixinJsConfig', weixinJsConfig)
      try {
        const WeixinJsConfigObject = AV.Object.extend('WeixinJsConfig')
        const weixinJsConfigObject = new WeixinJsConfigObject()
        Object.keys(weixinJsConfig).map(key => {
          weixinJsConfigObject.set(key, weixinJsConfig[key])
        })
        weixinJsConfigObject.set('url', url)
        const testObject = await weixinJsConfigObject.save()
        this.weixinJsConfigObject = testObject
      } catch (error) {
        console.log('保存数据失败。', error)
      }
      window.wx.config({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        ...weixinJsConfig,
        jsApiList: ['openAddress'] // 必填，需要使用的JS接口列表
      })
    },
    initLeanCloud () {
      AV.init({
        appId: 'nzKh4Er9mW317lM1Yo0rcOaw-gzGzoHsz',
        appKey: '0rDCGis1HEMIpc69zXS8uPqa',
        serverURL: 'https://db-leancloud-bluecoral.mrtangyun.com'
      })
    }
  }
}
</script>

<style lang="scss">
@import "./fonts/font.css";
html,
body {
  min-height: 100%;
  background-image: url("./assets/bg.jpg");
  background-repeat: repeat-y;
  background-size: 100% auto;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  font-size: 16px;
}
.STLiBian {
  font-family: STLiBian;
}
.AvantGardeITCbyBT {
  font-family: AvantGardeITCbyBT;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn {
  font-family: STLiBian;
  font-size: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 1em;
  color: whitesmoke;
  border-radius: 8px;
  min-width: 300px;
  border: 2px solid #999999;
  padding: 27px 0;
  background: linear-gradient(#cacaca, #bababa);
  transition: all 1.5s;
  &.isValidated {
    background: linear-gradient(#e8c343, #d5b030);
  }
  img {
    height: 27px;
  }
}
.pageContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    &.btns_row {
      .btn {
        width: 300px;
        &:first-child {
          margin-right: 11px;
        }
        &:last-child {
          margin-left: 11px;
        }
      }
    }
  }

  .pageContent {
    flex: 1;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
  .btns {
    margin: 1em 0 2em;
  }
}

.inputArea {
  border-radius: 15px;
  border: 5px solid #435f84;
  background: white;
  position: relative;
  padding: 0.5em 0em;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-shrink: 0;
  // overflow: hidden;
  input {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 48px;
    border: 0;
    text-align: center;
    outline: none;
    &::placeholder {
      font-family: STLibian;
      font-size: 48px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #c1c1c1;
    }
  }
  .ok {
    position: absolute;
    width: 56px;
    height: 56px;
    background-image: url("./components/images/status_ok.png");
    background-size: 100% 100%;
    right: 17px;
    top: 50%;
    transform: translateY(-50%);
    // z-index: -1;
  }
}
</style>
