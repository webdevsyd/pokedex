const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
  context: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|ico|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'img-loader',
            options: {
              name: '[name]_[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            // Loads CSS without any special processing. Reserved
            // for third-party CSS (i.e. from node_modules)
            resourceQuery: /^\?raw$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            use: [
              { loader: 'style-loader' },
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: {
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                  },
                  sourceMap: true,
                  importLoaders: 1,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    symlinks: false,
  },
  plugins: [htmlPlugin],
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
};
