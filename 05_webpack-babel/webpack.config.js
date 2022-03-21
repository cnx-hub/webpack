const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",

  mode: "development",

  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./build"),
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
      {
        test: /\.(jpe?g|png|svg|gif)/,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },

      {
        test: /\.(woff2?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]",
        },
      },

      // 1.一个个插件自己去指定
      // {
      //   test: /\.m?js/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         plugins: [
      //           "@babel/plugin-transform-block-scoping",
      //           "@babel/plugin-transform-arrow-functions",
      //         ],
      //       },
      //     },
      //   ],
      // },

      // 2.预设  第一种写在rules中
      // {
      //   test: /\.m?js/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [["@babel/preset-env"]],
      //     },
      //   },
      // },
      // 第二种  写在babel.config.js中
      {
        test: /\.m?js/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack案例",
      template: "./public/index.html",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "./",
          globOptions: {
            ignore: ["**/.DS_Store", "**/index.html"],
          },
        },
      ],
    }),
  ],
  mode: "development",
};
