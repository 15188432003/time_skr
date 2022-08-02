
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false, //优化打包生成.map
  //配置别名

  //配置代理
  devServer: {
    port:8080,
    host: 'localhost',
    open: true, 
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // proxy: {
    //   '/dev': {
    //     target: 'http://192.168.205.36:3000',
    //     changeOrigin: true,
    //     ws:true,
    //     pathRewrite: {
    //       '^/dev': ''
    //     }
    //   },
    // }
  },
  // 配置svg
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')) //对应下面配置svg的路径
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) //对应下面配置svg的路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  },

}