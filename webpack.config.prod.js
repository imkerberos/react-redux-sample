const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/Index.tsx",
  output: {
    path: path.join(__dirname, './'),
    filename: 'public/bundle/min.[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  externals: {
    'react': 'React',
    'react-dom' : 'ReactDOM',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: 'index.template.ejs',
      inject: 'body',
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: "ts-loader"}
        ]
      }
    ]
  }
};
