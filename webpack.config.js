//webpack2配置文件
var webpack = require('webpack');
var path = require('path');
//需要npm install
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports ={
	entry: {
		main: './test/main.js',
		tabMain: './test/tabMain.js'
	},
	output: {
		path: path.resolve(__dirname, 'js'),
		filename: '[name].js'
	},
	devServer: {//
	  contentBase: path.join(__dirname),//基本路径
	  compress: true,
	  port: 9000//端口
	},
	module: {
		//loaders --> rules
		rules: [
		   {
				test: /\.css$/,
				use:  ['style-loader', 'css-loader']
				/*ExtractTextPlugin.extract({
						fallback: "style-loader", 
					    use: "css-loader"
					  })*/
				//分离css文件loader
		   },
		   {
                test:/\.(png)|(jpg)$/,
                use: "url-loader?limit=50000"//小图片loader
           },
			{
				test: /\.html$/,
				use: 'raw-loader'
			}
		]
	},
	plugins: [
	    //js压缩插件
		/*new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['define', 'exports', 'require']
			}
		})*/
		//分离css文件插件
		//new ExtractTextPlugin('sohu-home-auto.css')
	]
	
}