const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
   template: path.join(__dirname, "demo/index.html"),
   filename: "./index.html"
});

module.exports = {
   entry: ["@babel/polyfill", path.join(__dirname, "demo/index.js")],
   output: {
        path: path.join(__dirname, "demo/dist"),
        filename: "bundle.js"
    },
   module: {
       rules: [
           {
               test: /\.(js|jsx)$/,
               use: "babel-loader",
               exclude: /node_modules/
           },
           {
               test: /\.css$/,
               use: ["style-loader", "css-loader"]
           },
           {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
                  }
                ]
            }
       ]
   },
   plugins: [htmlWebpackPlugin],
   resolve: {
       extensions: [".js", ".jsx"]
   },
   devServer: {
       port: 3001,
       open: true
   }
};
