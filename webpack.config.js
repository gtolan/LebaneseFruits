const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const appConfig = require('./app.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// file types & file links
const resource = {
    // js: { somejs: '//cdn/bootstrap/bootstrap.min.js' },
    man: {manifest: '/manifest.json'},
    rep: {mons: 'https://fonts.googleapis.com/css?family=Montserrat'},
    pre: {font2: 'https://fonts.googleapis.com/css?family=Playfair+Display'},
    css: {critical: './styles/above-fold-inline.css'},
    css: {hamburger: './styles/hamburger.css'},
    belowfold: {fold: '/styles/below-fold.css'},
    mob: {mobile: '/styles/mobile.css'},
    desk: {desktop: '/styles/desktop.css'},
    img: {favicon: appConfig.favicon}
}

const tpl = {
    img: '<link rel="shortcut icon" href="%s">',
    pre: '<link href="%s" rel="preload" as="font">',
    rep: '<link href="%s" rel="preload" as="font">',
    man: '<link rel="manifest" href="%s">',
    css: '<link rel="stylesheet" type="text/css" href="%s" inline>',
    belowfold:'<link rel="stylesheet" type="text/css" href="%s" >',
    mob: '<link rel="stylesheet" type="text/css" href="%s" media="screen and (max-width: 900px)">',
    desk: '<link rel="stylesheet" type="text/css" href="%s" media="screen and (min-width: 900px)">',
    js: '<script type="text/javascript" src="%s"></script>'
}

// Webpack Configuration
const config = {

    // Entry
    entry: {
        app: ['./src/js/index.js'],
    },
    // Output
    mode: "production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Loaders
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"

                ]
            }
            ,
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    // Plugins
    plugins: [

        new MiniCssExtractPlugin({
            filename: "critical.css"
            // filename: "[name].css",
            // chunkFilename: "[id].css"
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),

        new htmlWebpackPlugin({
            'meta': {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'msapplication-TileImage': appConfig.msTileImage,
                'msapplication-TileColor': appConfig.msTileColor,
                'description': appConfig.description,
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#4285f4'
                // Will generate: <meta name="theme-color" content="#4285f4">
            },
            title: appConfig.appName,
            icon: appConfig.icon,
            icon72: appConfig.icon72,
            icon114: appConfig.icon114,
            icon144: appConfig.icon144,
            myPageHeader: 'Hello World',
            template: './src/index.html',
            filename: 'index.html',
            hash: false
        }),


        new HtmlReplaceWebpackPlugin([
            // {
            //     pattern: 'foo',
            //     replacement: '`foo` has been replaced with `bar`'
            // },
            // {
            //     pattern: '@@title',
            //     replacement: 'html replace webpack plugin'
            // },
            {
                pattern: '@@lang',
                replacement: appConfig.language
            },
            {
                pattern: /(<!--\s*|@@)(css|js|img|mob|desk|man|pre|rep|belowfold):([\w-\/]+)(\s*-->)?/g,
                replacement: function (match, $1, type, file, $4, index, input) {
                    // those formal parameters could be:
                    // match: <-- css:bootstrap-->
                    // type: css
                    // file: bootstrap
                    // Then fetch css link from some resource object
                    // var url = resources['css']['bootstrap']

                    var url = resource[type][file]

                    // $1==='@@' <--EQ--> $4===undefined
                    return $4 == undefined ? url : tpl[type].replace('%s', url)
                }
            }
        ])

    ]
    // OPTIONAL
    // Reload On File Change
    // watch: true,
    // Development Tools (Map Errors To Source File)

};
// Exports
module.exports = config;