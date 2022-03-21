const path = require("path");

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./bulid"),
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

      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   // asset/resource  =>  相当于file-loader
      //   // asset/inline  => url-loader

      //   type: "asset/resource",
      //   generator: {
      //     filename: "img/[name].[hash:8][ext]",
      //   },
      // },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
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
          filename: "file/[name]_[hash:6][ext]",
        },
      },
    ],
  },

  mode: "development",
};
