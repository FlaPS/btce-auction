const path = require("path");
const webpack = require("webpack");
const ip = require("ip");

const host = "0.0.0.0"; // ip.address()
const port = 8081;
module.exports = {
  mode: "production",
  entry: {
    front: [

      //'webpack-dev-server/client?http://' + host + ':' + port,
      "./src/indexDev.tsx",
    ],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./public"),
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /.ts?$|.tsx?$/,
        exclude: /\.story\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              allowTsInNodeModules: true,
            },
          },
        ],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "image-webpack-loader",
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port,
    //  hot: true,
    inline: true,
    host,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
