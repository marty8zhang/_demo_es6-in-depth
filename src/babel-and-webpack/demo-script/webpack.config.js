const path = require('path') // `path` is a core Node.js module that's used to manipulate file paths.

module.exports = {
  mode: 'development',
  entry: './babel-and-webpack/demo-script/fruits.js', // Default: `./src/index.js`.
  output: {
    filename: 'fruits.js', // Default: `main.js`.
    path: path.resolve(__dirname, 'dist'), // Default: `./dist`.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // Note: Here is how Babel can be automatically utilised by webpack. It's also named `loader` in older versions of webpack.
        exclude: /node_modules/,
      },
    ],
  },
}
