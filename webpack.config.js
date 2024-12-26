const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
//   resolve: {
//     alias: {
//       '@audio':      path.resolve(__dirname, "src/audio"),
//     },
//     extensions: ['.tsx', '.ts', '.js'],
//   },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" }
      ],
    }),
  ],
};
