const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      // 定义全局变量
      "process.env.NODE_ENV": JSON.stringify("__DEV__")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map"
});
