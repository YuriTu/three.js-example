
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

// let entry = ['./ch1/basicEnv.js','./ch1/basicCube.js'];

module.exports = {
    entry: {
        app: './ch1/basicEnv.js',
        app2: './ch1/basicCube.js'
    },
    // entry: entry,
    output: {
        filename: devMode ? 'js/[name].[hash:8].js' : 'js/index.[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        }),
        new HtmlWebpackPlugin({
            chunks:['app'],
            filename:'basicEnv.html',
            hash: true,
            title: 'Output Management',
            template: './ch1/BasicEnv.html'
        }),
        new HtmlWebpackPlugin({
            chunks:['app2'],
            filename:'app2.html',
            hash: true,
            title: 'Output Management',
            template: './ch1/BasicEnv.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, '../src')
                // exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('postcss-import'), require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'asset/font/[name].[hash:8].[ext]',
                    publicPath: '../'
                }
            }
        ]
    }
};
