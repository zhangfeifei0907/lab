/**
 * Created by feifei on 18/3/11.
 */
const path = require('path');
const webpack=require('webpack');
var ROOT_PATH = path.resolve(__dirname);

var ASSETS_PATH = path.resolve(ROOT_PATH, 'assets');
var ENTRY_PATH = path.resolve(ROOT_PATH, 'assets/entry');
var BUILD = path.resolve(ROOT_PATH, 'build');


const config={
    mode:'development',
    entry:{
        vendor: [
            'react',
            'react-dom'
            ],
        login:[
            path.resolve(ENTRY_PATH, 'login.js')
        ]
    },
    output:{
        path:BUILD,
        filename:'[name].bundle.js'
    },
    devServer:{
        hot:true,

    },
    devtool: false,
    plugins:[

       new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    cache: true,
    module:{
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                // options for the loader
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                    {
                    loader: "less-loader",options: { javascriptEnabled: true } // compiles Less to CSS
                }],

            },

        ]
    }
};


module.exports = config;