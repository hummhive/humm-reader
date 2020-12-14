const packageJSON = require("./package.json")
const { ModuleFederationPlugin } = require("webpack").container
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

module.exports = {
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
    modules: ["node_modules", "src"],
    alias: {
      webpack: "webpack5",
    },
    fallback: {
      "@apollo/client": false,
      "@hummhive/api-react-utils": false,
      "@hummhive/local-state": false,
      "@hummhive/ui-elements": false,
      inversify: false,
      react: false,
      "react-dom": false,
      "react-router": false,
      "styled-components": false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: packageJSON.connectionDefinition.packageName,
      library: {
        type: "umd",
        name: packageJSON.connectionDefinition.packageName,
      },
      filename: "remoteEntry.js",
      exposes: {
        "./SettingsUI": "./src/settingsUI",
        "./api": "./src/api",
      },
      shared: {
        "@apollo/client": {},
        "@hummhive/api-react-utils": {},
        "@hummhive/local-state": {},
        "@hummhive/ui-elements": {},
        inversify: {},
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        "react-router": {
          singleton: true,
        },
        "styled-components": {
          singleton: true,
        },
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: packageJSON.connectionDefinition.packageName,
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
}
