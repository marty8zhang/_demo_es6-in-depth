const path = require('path') // `path` is a core Node.js module that's used to manipulate file paths.

module.exports = {
  mode: 'development',
  entry: {
    'scripts/my-app': [
      './babel-and-webpack/demo-webpage/src/print-info.js',
      './babel-and-webpack/demo-webpage/src/print-colors.js',
    ],
  }, // Default: `./src/index.js`.
  output: {
    path: path.resolve(__dirname, 'dist'), // Default: `./dist`.
    filename: '[name].js', // Note: This syntax utilises the property name(s) defined inside the above `entry`. Default: `main.js`.
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
