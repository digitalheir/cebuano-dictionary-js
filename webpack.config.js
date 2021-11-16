const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');

const VERSION = require('./version').default;
const libraryName = 'cebuano-stemmer';

const plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true
            }
        }
    })
];

let outputFile;

if (yargs.argv.p) {
    //plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + /*'.' + VERSION +*/ '.min.js';
} else {
    outputFile = libraryName /*+ '.' + VERSION*/ + '.js';
}

const config = {
    entry: [
        __dirname + '/src/index.ts'
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '/'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: "tsconfig.webpack.json",
                    useBabel: true
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    plugins: plugins

    // Individual Plugin Options
};

module.exports = config;