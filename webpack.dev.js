const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge(config, {
  devServer: {
    contentBase: './dist',
    hot: true,
      stats: { // 构建输出信息精简
      modules: false,
      colors: true,
      children: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义全局变量
      "process.env.NODE_ENV": JSON.stringify("__DEV__")
    }),
    new webpack.NamedModulesPlugin(), // 显示模块的相对路径
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map"
});
