const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		app: ['react-hot-loader/patch', './src']
	},
	devtool: 'inline-source-map',
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin({ sourceMap: true })],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contentHash].css',
			chunkFilename: '[id].[contentHash].css',
		}),
		new webpack.LoaderOptionsPlugin({
			options: { postcss: [autoprefixer()] },
		}),
		// new CleanWebpackPlugin(),
	],
	node: { fs: 'empty', net: 'empty', tls: 'empty' },
	output: {
		filename: '[name].[contentHash].bundle.js',
		// path: path.resolve(__dirname, 'dist'),
		path: "C:\\2020\\Employer",
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			},
			{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
			{
				test: [/(antd|antdStyles|styles).(sa|sc|c)ss$/, /\.css$/],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					'sass-loader',
				],
			},
			{
				test: /\.(sa|sc)ss$/,
				exclude: [/antdStyles.scss$/,/styles.scss$/,/Draft.css$/],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { modules: { localIdentName: '[name]_[local]' } },
					},
					{
						loader: 'postcss-loader',
					},
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
						outputPath: "img"
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: './[hash].[ext]',
						publicPath: 'fonts/',
						outputPath: 'fonts/',
					},
				},
			},
		],
	},
};
