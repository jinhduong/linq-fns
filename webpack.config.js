const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        'linq-fns': './dist/browser/linq-fns.js',
        // 'linq-fns-localStorage': './dist/browser/linq-fns.localStorage.js',
        // 'linq-fns-gist': './dist/browser/linq-fns.gist.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'linq-fns'
        }),
        new BundleAnalyzerPlugin()
    ],
    output: {
        filename: `[name].min.js`,
        path: path.resolve(__dirname, 'dist/browser-lib')
    }
};