const path = require("path");
//const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: "../cloud_api/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        fallback: {
            "url": require.resolve("url/"),
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": false,
            "crypto": false,
            "buffer": false ,
            "os": false,
            "util": false,
            "process": false,
            "timers": false,
            "dns":false,
            "string_decoder": false,
           "querystring": false
        }
    }
    //   plugins: [
    //     new CleanWebpackPlugin()
    //   ]
}