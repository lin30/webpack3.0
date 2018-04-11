const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 构建前清空 dist
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const config = {
  entry: {
    main: "./src/index.js",
    vendor: ["vue"]
  },
  output: {
    filename: "[name].[hash:4].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['happypack/loader?id=happy-css']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "name your title here"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting
    new CleanWebpackPlugin(["dist"]),
    new webpack.HashedModuleIdsPlugin(), // 使用模块的路径，而不是数字标识符解析模块,稳定 vendor 的 hash
    new webpack.optimize.CommonsChunkPlugin({
      // 提取公共模块,对不常改变的库进行缓存
      // runtime 代码主要用来处理代码模块的映射关系,不提取会打入 vendor, 导致 每次构建后 vendor hash变化
      name: ["vendor", "runtime"]
    }),
    new HappyPack({
      id: 'happy-css',
      loaders: ['style-loader', 'css-loader'],
      threadPool: happyThreadPool,
    })
  ]
};
module.exports = config;
