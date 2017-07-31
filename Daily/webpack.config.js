var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		context: path.join(__dirname, 'src'),
		entry: {
			index: './index.jsx'
		},
		output: {
			path: path.join(__dirname, 'dist/js'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					options: {
						presets: ['es2015', 'react']
					},
				},
			],
		},
		devServer: {
			contentBase: 'dist'
		},
		plugins: [
//			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.AggressiveMergingPlugin(),
		],
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx']
		}
	},
	{
		context: path.join(__dirname, 'src/css'),
		entry: {
			index: './index.scss'
		},
		output: {
			path: path.join(__dirname, 'dist/css'),
			filename: '[name].css'
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract(
						{
							fallback: 'style-loader',
							use: ['css-loader', 'sass-loader']
						}
					)
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('[name].css')
		]
	}
]