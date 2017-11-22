var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig,build) {

	"use strict";
	var dest = fabricatorConfig.dest;
	if (build!==undefined){
		dest = build;
	}

	var config = {
		entry: {
			'fabricator/scripts/f': fabricatorConfig.src.scripts.fabricator,
			'styleguide/scripts/alv-ch': fabricatorConfig.src.scripts.styleguide,
			'styleguide/scripts/drawer': fabricatorConfig.src.scripts.drawer,
			'styleguide/scripts/smartbanner.min': fabricatorConfig.src.scripts.smartbanner
		},
		output: {
			path: path.resolve(__dirname, dest, 'assets'),
			filename: '[name].js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					//exclude: /(node_modules|prism\.js)/,
					loaders: ['babel-loader']
				}
			]
		},
		plugins: [],
		cache: {}
	};

	if (!fabricatorConfig.dev) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		);
	}

	if (dest!=='dist') {
		config.entry = {
				'scripts/alv-ch': fabricatorConfig.src.scripts.styleguide
		};
		config.output.path = path.resolve(__dirname, dest);
	}

	return config;

};
