module.exports = {
  devServer: {
    port: 8848 // 端口
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/ele/'
    : '/'
}
