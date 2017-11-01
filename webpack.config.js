const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 构建前清空 dist

const config = {
  entry: {
    main: "./src/main.js",
    vendor: ["vue", "vue-router"]
  },
  output: {
    filename: "[name].[hash:4].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: { // 取 Vue 完整版(含 template 编译)
      'vue': 'vue/dist/vue.js'
    },
    extensions: ['.css', '.js', '.json', '.vue'] // 扩展名省略
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.HashedModuleIdsPlugin(), // 使用模块的路径，而不是数字标识符解析模块,稳定 vendor 的 hash
    new webpack.optimize.CommonsChunkPlugin({
      // 提取公共模块,对不常改变的库进行缓存
      // runtime 代码主要用来处理代码模块的映射关系,不提取会打入 vendor, 导致 每次构建后 vendor hash变化
      name: ["vendor", "runtime"]
    })
  ]
};
module.exports = config;
