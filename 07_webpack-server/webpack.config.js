const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  // 设置模式
  // development 开发阶段, 会设置development
  // production 准备打包上线的时候, 设置production
  mode: "development",
  // 设置source-map, 建立js映射文件, 方便调试代码和错误
  devtool: "source-map",
  // watch: true,

  // 告诉devserve是在web/node环境下打开
  target: "web",
  devServer: {
    // 当服务器没有找到对应的资源时  =>  往./public下寻找
    // contentBase: "./public",
    static: ["public"],
    hot: true, //开启热更新HMR
    // host: "0.0.0.0", //设置主机地址
    port: 3000, //端口号
    open: true, //是否默认打开浏览器
    // compress: true, //是否为静态文件开启gzip compression
    // proxy跨域代理
    proxy: {
      "/api": {
        target: "http://localhost:8888", // /api/users   =>http://localhost:8888/api/users
        pathRewrite: { "^/api": "" }, //将/api 重写
        secure: false, //默将不会接受转发到HTTPS服务器上
        changeOrigin: true, //换源
      },
    },
  },

  resolve: {
    // 后缀名
    extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      js: path.resolve(__dirname, "./src/js"),
    },
  },

  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/bundle.js",
    // assetModuleFilename: "img/[name]_[hash:6][ext]"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]",
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "哈哈哈哈",
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "public",
    //       to: "./",
    //       globOptions: {
    //         ignore: ["**/index.html"],
    //       },
    //     },
    //   ],
    // }),
    new VueLoaderPlugin(),
  ],
};
