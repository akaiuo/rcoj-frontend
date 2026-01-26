const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  // publicPath : "./",
  transpileDependencies: true,
  devServer: {
    port: 8080,
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:8081/",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" },
      },
      '/hitokoto': { //一言接口  //解决跨域
        target: "https://v1.hitokoto.cn/?c=e&c=g&c=i&c=k", //接口域名（你请求的第三方接口）
        changeOrigin: true,             //是否跨域 （虚拟的站点需要更管origin）
        ws: true,                       //是否代理 websockets
        secure: true,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/hitokoto': ''
        }
      }
    },
    allowedHosts: "all",
    client: {
      overlay: false
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
