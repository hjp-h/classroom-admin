// const path = require('path')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers'

module.exports = {
  // 1.vueCLI中的配置
  outputDir: './bundle',
  publicPath: '/',
  devServer: {
    // 配置代理
    proxy: {
      '/api': {
        // 以/api开头的接口最终将转发到这里
        target: 'http://localhost:8888',
        // 把/api’去掉, 因为真实的接口地址是没有/api的
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 2.configureWebpack中的配置和webpack里的配置一模一样 最终会合并
  configureWebpack: {
    // 配置别名
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }

  // 3.configureWebpack为函数的形式
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
}
