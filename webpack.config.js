const path                 = require("path");
const ExtractTextPlugin    = require("extract-text-webpack-plugin");
const webpack              = require("webpack");
const ManifestPlugin       = require("webpack-manifest-plugin");
const CleanWebpackPlugin   = require("clean-webpack-plugin");


const PATHS = {
    app:path.join(__dirname,"src/js/app.js"),
    style:path.join(__dirname,"src/styles/style.scss"),
    build:path.join(__dirname, "/public") 
};

const autoprefix = function() {
    return {
        loader: "postcss-loader",
        options: {
            plugins: () => ([
                require("autoprefixer"),
            ]),
        },
    };
};

module.exports = {
    entry: {
        app:PATHS.app,
    },
    devtool:"cheap-source-map",
    output: {
        filename: (process.env.NODE_ENV === "production") ? "[name].[chunkhash].js" : "[name].js",
        path: PATHS.build
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: PATHS.style,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", autoprefix()],
                    fallback: "style-loader",
                }),
            },
            {
                test: /\.scss$/,
                include: PATHS.style,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", autoprefix(), "sass-loader"],
                    fallback: "style-loader",
                }),
            },
            {
                test: /(\.js|.jsx)$/,
                loader: "babel-loader",
                options: {
                    presets: ["react","es2015"]
            }
        }]
    },
    resolve:{
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    plugins:[
        new CleanWebpackPlugin([PATHS.build]),
        new ExtractTextPlugin({
            filename: (process.env.NODE_ENV === "production") ? "[name].[contenthash].css" : "[name].css",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "bundle",

            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf("node_modules") >= 0 &&
                resource.match(/\.js$/)
            ),
        }),
        new webpack.optimize.UglifyJsPlugin(), 
        new ManifestPlugin()
    ]
};