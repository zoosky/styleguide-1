var path = require('path');
var webpack = require('webpack');

module.exports = function(fabricatorConfig) {

	"use strict";

	var config = {
		entry: {
			'fabricator/scripts/f': fabricatorConfig.src.scripts.fabricator,
			'styleguide/scripts/alv-ch': fabricatorConfig.src.scripts.styleguide,
			'styleguide/scripts/alv-ch_reset': fabricatorConfig.src.scripts.reset
		},
		output: {
			path: path.resolve(__dirname, fabricatorConfig.dest, 'assets'),
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

	if (fabricatorConfig.dest==='build') {
		config.entry = {
				'scripts/alv-ch': fabricatorConfig.src.scripts.styleguide,
				'scripts/alv-ch_reset': fabricatorConfig.src.scripts.reset
		};
		config.output.path = path.resolve(__dirname, fabricatorConfig.dest);
	}

	return config;

};
