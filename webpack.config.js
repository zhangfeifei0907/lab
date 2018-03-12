/**
 * Created by feifei on 18/3/11.
 */
const path = require('path');
const ENTORY=path.resolve('./entry');
const DIST=path.resolve('./dist');
console.log(__dirname);
console.log(__filename);
console.log('./-->',path.resolve('./'));
console.log('./-->',path.resolve('./entry'));
console.log('./-->',path.resolve('./entry/'));
const config={
    entry:{
        index:ENTORY+'/index.js',
        index22:ENTORY+'/index2.js'
    },
    output:{
        path:DIST,
        filename:'[name].bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, "entry")
                ],
                //exclude: [
                //    path.resolve(__dirname, "app/demo-files")
                //],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include

                loader: "babel-loader",
                // options for the loader
            },
        ]
    }
};


module.exports = config;