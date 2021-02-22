
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
	// entry: {
	// 	app: './src/index.js',
	// },
	entry: {
		app: ['react-hot-loader/patch', './src'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new webpack.LoaderOptionsPlugin({
			options: { postcss: [autoprefixer()] },
		}),
	],
	node: { fs: 'empty', net: 'empty', tls: 'empty' },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		port: 8080,
		contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')],
		compress: true,
		quiet: false,
		disableHostCheck: true,
		historyApiFallback: true,
		publicPath: '/',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
			},
			{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
			{
				test: [/(antd|antdStyles|styles).(sa|sc|c)ss$/, /\.css$/],
				use: [
					{
						loader: "style-loader",
						options: {
							hmr: false,
						}
					},
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
					{
						loader: "style-loader",
						options: {
							hmr: false,
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							localIdentName: '[local]__[hash:base64:5]',
						}
					},
					{
						loader: 'postcss-loader',
					},
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				include: path.join(__dirname, 'img'),
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: './[name].[ext]',
						publicPath: 'fonts/',
						outputPath: 'fonts/',
					},
				},
			},
		],
	},
};
