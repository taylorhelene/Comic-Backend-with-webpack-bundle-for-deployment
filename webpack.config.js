 // webpack.config.js
 const path = require('path');

 module.exports = {
   target: 'node', 
   entry: './index.js', 
   mode: 'production',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   devServer: {
    static: false,
    port: 4000,
  },
   performance: {
    hints: false
  },
  externals: { 'sqlite3':'commonjs sqlite3', }
   // Additional configuration goes here
 };