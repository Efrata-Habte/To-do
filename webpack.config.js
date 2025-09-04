const path = require('path');

module.exports = {
  entry: './src/Scripts/index.js',  // your actual JS file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // output folder
  },
  mode: 'production',
};
