const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  // publicPath : "./",
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: false, // 自动打开浏览器
    https: false,
    compress: false, //vue-cli5版本中必须设置关闭这个选项，不然sse连接，走代理后，连接会成功，但是message这个事件不会被监听触发。vue-cli4版本的不需要
  proxy: {
      "/api": {
        target: "http://localhost:8101/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" }, // 比如前端请求 /api/stream → 代理到 http://localhost:8080/stream
      },
      '/hitokoto': { //一言接口  //解决跨域
        target: "https://v1.hitokoto.cn/?c=e&c=g&c=i&c=k", //接口域名（你请求的第三方接口）
        changeOrigin: true,             //是否跨域 （虚拟的站点需要更管origin）
        ws: true,                       //是否代理 websockets
        pathRewrite: {                  //路径重置
          '^/hitokoto': ''
        }
      },
      '/streamChat': {
        // 后端接口地址（替换为你的实际后端地址，不要加 /api）
        target: 'http://localhost:18200',
        // 关键1：开启跨域（必须）
        changeOrigin: true,
        // 关键2：适配长连接（SSE 依赖长连接，即使不是 WebSocket 也建议开启）
        ws: true,
        // 关键3：路径重写（如果后端接口本身带 /api 则不需要这行）
        pathRewrite: {
          '^/streamChat': '/streamChat'
        },
        // 关键4：配置代理响应，适配 SSE 流式特性（核心！）
        onProxyRes: (proxyRes, req, res) => {
          // 1. 强制设置 SSE 必需的响应头，避免代理篡改
          proxyRes.headers['Content-Type'] = 'text/event-stream';
          // 2. 禁用缓存（否则浏览器会缓存流式数据，无法实时接收）
          proxyRes.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
          proxyRes.headers['Pragma'] = 'no-cache';
          proxyRes.headers['Expires'] = '0';
          // 3. 禁用压缩（压缩会将流式分块合并，导致无法逐行接收）
          delete proxyRes.headers['Content-Encoding'];
          // 4. 保留分块传输标识（确保数据逐块返回）
          proxyRes.headers['Transfer-Encoding'] = 'chunked';
          // 5. 允许 SSE 跨域的额外头部（可选，根据后端配置）
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
          proxyRes.headers['Access-Control-Allow-Headers'] = '*';
          proxyRes.headers['Keep-Alive'] = 'timeout=60';
          proxyRes.headers['Connection'] = 'keep-alive';

        },
        // 关键5：禁用代理压缩（避免流式数据被合并）
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 告诉后端不要压缩响应
            proxyReq.setHeader('Accept-Encoding', 'identity');
          });
        }
      }
    },
    allowedHosts: "all",
    client: {
      overlay: false // 显示错误日志
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
