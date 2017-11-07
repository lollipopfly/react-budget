var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PurifyCSSPlugin = require('purifycss-webpack'); // очищает неиспользованнык стили

var HtmlWebpackPlugin = require('html-webpack-plugin'); // перемещает index.html

var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    // если разделить по точкам будут создаваться лишние .js файлы
    app: [
      './src/js/index.js',
      './src/scss/style.scss'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  devServer: {
    overlay: !inProduction,
    contentBase: path.join(__dirname, "dist"),
  },

  module: {
    // SASS
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      // IMAGES
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      // FONTS
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      // JS
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2']
          }
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, 'index.html')),
    //   minimize: inProduction,
    // }),

    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};

if(inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

if(!inProduction) {
  module.exports.plugins.push(
    new webpack.SourceMapDevToolPlugin()
  );
}
