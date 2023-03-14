const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";
const babelOptions = (presets) => {
    const opts = {
        presets: ['@babel/preset-env'],
    };

    if (presets) {
        opts.presets.push(presets);
    }

    return opts;
};

const config = {
    entry: "./index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '...'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        modules: [path.resolve(__dirname, './src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript'),
                },
            },
            {
                test: /\.(ts|js)x$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, "css-loader", "sass-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
