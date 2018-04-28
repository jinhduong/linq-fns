const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'linq-fns': './dist/browser/linq-fns.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        })
    ],
    output: {
        filename: `[name].min.js`,
        path: path.resolve(__dirname, 'dist/browser-lib')
    }
};