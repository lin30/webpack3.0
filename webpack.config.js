const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 构建前清空 dist
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const entry = require('./entry');
const pages = require('./pages');

const config = {
  entry: { vendor: ['vue'], ...entry },
  output: {
    filename: "[name].[hash:4].js",
    path: path.resolve(__dirname, "dist/pages")
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['happypack/loader?id=happy-css']
      },
      {
        test: /.vue$/,
        use: ['happypack/loader?id=happy-vue']
      },
      {
        test: /.js$/,
        use: ['happypack/loader?id=happy-js'],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: "name your title here"
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting
    new CleanWebpackPlugin(["dist"]),
    new webpack.HashedModuleIdsPlugin(), // 使用模块的路径，而不是数字标识符解析模块,稳定 vendor 的 hash
    new webpack.optimize.CommonsChunkPlugin({
      // 提取公共模块,对不常改变的库进行缓存
      // runtime 代码主要用来处理代码模块的映射关系,不提取会打入 vendor, 导致 每次构建后 vendor hash变化
      name: ["vendor"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["manifest"],
      chunks: ['vendor']
    }),
    new HappyPack({
      id: 'happy-css',
      loaders: ['style-loader', 'css-loader'],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'happy-vue',
      loaders: ['vue-loader'],
      threadPool: happyThreadPool,
      verbose: false
    }),
    new HappyPack({
      id: 'happy-js',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: false
    })
  ]
};
// 根据入口js数组生成页面
Object.keys(entry).forEach((item) => {

    var cfg = {
        filename: item + '.html',
        template: path.resolve(__dirname, './src/index.html'),
        chunks: ['vendor', 'runtime', item]
    }
    if (pages[item]) {
      cfg.title = pages[item]
    }
    config.plugins.push(new HtmlWebpackPlugin(cfg));

})

module.exports = config;
