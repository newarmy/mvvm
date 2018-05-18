//webpack2配置文件
var webpack = require('webpack');
var path = require('path');
//需要npm install
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports ={
	mode: 'none',
	entry: {
        lazyMain: './example/route/lazyRoute.js',
        hookMain: './example/route/routeHook.js',
        routeHook: './example/route/routeHook.js',
        singleComp: './example/single/singleComp.js',
		multiComp: './example/muiti/multiComp.js',
		dataFlow: './example/data-flow/testFlowMain.js'
	},
	output: {
		path: path.resolve(__dirname, 'js'),
        chunkFilename: '[id].js',
		filename: '[name].js',
        publicPath: 'http://localhost:63343/mvvm/js/'
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
				test: /\.js$/,
                loader: "babel-loader",
				exclude: /node_modules/
            },
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
	}
	
}