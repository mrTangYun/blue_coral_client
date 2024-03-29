module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '蓝珊瑚鲜生挚情卡'
        return args
      })
  },
  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:4000',
        // target: 'http://blue-coral.mrtangyun.com/api',
        target: 'http://www.digroup.com.cn:3050/api',
        ws: true,
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      }
    }
  }
}
