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
        target: 'http://blue_coral.mrtangyun.com/api',
        // target: 'http://www.digroup.com.cn:3015/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}
