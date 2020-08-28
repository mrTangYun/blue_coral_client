module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '蓝珊瑚鲜生挚情卡'
        return args
      })
  },
  outputDir: 'dist'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/blue_coral_client/'
  //   : '/'
}
