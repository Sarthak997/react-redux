var webpack = require("webpack");
var path = require("path");
// const dotenv = require("dotenv");

// const env = dotenv.config().parsed;

// variables
var isProduction = process.argv.indexOf("production") >= 0;
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./dist");

// API Host name
// const API_HOST_NAME = isProduction
//   ? env.API_URL_PRODUCTION
//   : env.API_URL_DEVELOPMENT;

// console.log(API_HOST_NAME);
// env
// const envKeys = {
//   "process.env.API_HOST_NAME": `'${API_HOST_NAME}'`,
//   "process.env.NODE_ENV": isProduction ? "'production'" : "'development'",
//   "process.env.USER_POOL_ID": `'${env.USER_POOL_ID}'`,
//   "process.env.CLIENT_ID": `'${env.CLIENT_ID}'`,
//   "process.env.IDENTITY_POOL_ID": `'${env.IDENTITY_POOL_ID}'`,
//   "process.env.AWS_REGION": `'${env.AWS_REGION}'`,
//   "process.env.MIXPANEL": `'${env.MIXPANEL}'`,
// };

// console.log('envKeys: ', envKeys);

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
    // publicPath: "/",
  },
  target: "web",
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"],
    modules: ["node_modules", "./src"],
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
    ],
  },
  //   optimization: {
  //     splitChunks: {
  //       name: true,
  //       cacheGroups: {
  //         commons: {
  //           chunks: "initial",
  //           minChunks: 2,
  //         },
  //         vendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           chunks: "all",
  //           priority: -10,
  //         },
  //       },
  //     },
  //     runtimeChunk: true,
  //   },
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
    // publicPath: "/",
    // contentBase: isProduction ? outPath : sourcePath,
    // hot: isProduction ? false : true,
    // inline: true,
    // historyApiFallback: true,
    // stats: isProduction ? "none" : "minimal",
    // clientLogLevel: isProduction ? "none" : "warning",
    // overlay: isProduction ? false : true,
    // disableHostCheck: true,
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? "hidden-source-map" : "eval",
  //   node: {
  //     // workaround for webpack-dev-server issue
  //     // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
  //     fs: "empty",
  //     net: "empty",
  //   },
};

module.exports = config;
