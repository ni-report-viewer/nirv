const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === "production" ? "/nirv/" : "/",
  chainWebpack: (config) => {
    config.plugin("polyfills").use(NodePolyfillPlugin);
  },
};
