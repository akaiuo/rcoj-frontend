const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
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
    },
    allowedHosts: "all",
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
