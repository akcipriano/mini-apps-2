const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/app.jsx'),
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  }
}