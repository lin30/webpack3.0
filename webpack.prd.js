const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(config, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // 定义全局变量
      "process.env.NODE_ENV": JSON.stringify("__PRO__")
    }),
    new UglifyJSPlugin({
      // sourceMap: true // 是否压缩后开启sourceMap
    })
  ],
  stats: { // 构建输出信息精简
    modules: false,
    children: false
  },
  output: {
    filename: "[name].[chunkhash:8].js"
  }
});
