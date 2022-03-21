const path = require("path");

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        // 写法一
        // use: ["style-loader", "css-loader"],
        // 写法二
        use: [
          { loader: "style-loader", options: {} },
          { loader: "css-loader", options: {} },
          { loader: "postcss-loader" },
          //   {
          //     loader: "postcss-loader",
          //     options: {
          //       postcssOptions: {
          //         plugins: [require("autoprefixer")()],
          //       },
          //     },
          //   },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
