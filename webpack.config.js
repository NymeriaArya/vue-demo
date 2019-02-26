const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css
//提取公共文件
const webpack = require('webpack');

module.exports={
	entry: {
		main:'./src/main.js',
	},
	output: {
		path: path.join(__dirname,'dist'),
		// publicPath: '/',
		// filename: 'build.js?v=1.0.0',
		// filename: 'build.js',
		filename: 'js/[chunkhash].js'
	},
	module:{
		loaders: [
			{
				test: /\.css$/,
				// loader: 'style-loader!css-loader',
				//提取css
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.less$/,
				loader: 'less-loader',
			},
			{
				test:/\.(jpg|png|gif|jpeg|gif|svg|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 4096,//4096字节以上生成文件，否则base6
					name: 'assets/[name].[ext]',
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				// options: {
					// presets: ['es2015'],//关键字
					// plugins: ['transform-runtime'],//函数
					//如果多次使用同一个options，可以提取到.babelrc文件
				// }
			},
			//解析vue-preview
			{
				test:/vue-preview.src.*?js$/,
				loader: 'babel-loader',
// 				options: {
// 					presets: ['es2015'],//关键字
// 					plugins: ['transform-runtime'],//函数
// 				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new ExtractTextPlugin("css/[contenthash].css"),
		new webpack.optimize.CommonsChunkPlugin({
			//manifest 清单，记录使用者和第三方包之间的关系
			names:['vendors','manifest']
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
	]
	
}