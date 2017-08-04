var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BabelTransformClassProperties = require('babel-plugin-transform-class-properties');
module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: {
          loader: 'babel-loader', 
          options: {
          plugins: [require('babel-plugin-transform-class-properties')]
          } 
        } 
      },
      { 
        test: /\.(scss)$/, 
        use: ['style-loader', 'css-loader', 'sass-loader'] 
      },
      { 
        test: /\.(jpe?g|png)$/, 
        use: 'file-loader?emitFile=false&name=[path][name].[ext]'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [ new HtmlWebpackPlugin({
    template: 'app/index.html'
  })]
}