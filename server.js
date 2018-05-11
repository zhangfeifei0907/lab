/**
 * Created by feifei on 2018/5/11.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

const options = {
    contentBase: './build',
    hot: true,
    host: 'localhost'
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});