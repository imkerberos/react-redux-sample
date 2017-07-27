const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Index.tsx',
  output: {
    path: path.join(__dirname, './'),
    filename: 'public/bundle/min.[chunkhash].js',
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  externals: {
    'react': 'React',
    'react-dom' : 'ReactDOM',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: 'ts-loader'}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: 'index.template.ejs',
      inject: 'body',
    })
  ],
};
