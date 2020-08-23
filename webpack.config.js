const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './main.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    },
    module: {
        rules: [
            { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
            { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.html$/, use: [ { loader: 'html-loader' }]}
        ]
    },
    mode: "development",
    devtool: "source-map",
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};