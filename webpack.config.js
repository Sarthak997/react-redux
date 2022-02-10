var webpack = require("webpack");
var path = require("path");

// variables
var isProduction = process.argv.indexOf("production") >= 0;
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");

// plugins
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");

const config = {
  context: sourcePath,
  entry: {
    app: "./main.jsx",
  },
  output: {
    path: outPath,
    filename: "bundle.js",
    // chunkFilename: "[chunkhash].js",
    publicPath: "/",
  },
  target: "web",
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"],
    modules: ["node_modules", "./src"],
    fallback: {
      fs: false,
    },
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ["module", "browser", "main"],
    alias: {
      app: path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      // .js, .jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // static assets
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2|otf)$/,
        use: "file-loader",
      },
      { test: /\.svg/, type: "asset/inline" },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isProduction
        ? JSON.stringify("production")
        : JSON.stringify("development"),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? "'production'" : "'development'", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    // new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      //   favicon: "@assets/favicon.ico",
      template: "@assets/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:8080",
    }),
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? "hidden-source-map" : "eval",
};

module.exports = config;
