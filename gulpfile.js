'use strict';

// modules
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');

var tildeImporter = require('node-sass-tilde-importer');
var findup = require('findup-sync');
const node_modules = findup('node_modules');
var options = {
	importer: tildeImporter,
	includePaths: [node_modules] // this will find any node_modules above the current working directory
};

// configuration
var config = {
	dev: gutil.env.dev,
	src: {
		scripts: {
			fabricator: './src/assets/fabricator/scripts/fabricator.js',
			styleguide: './src/assets/styleguide/scripts/alv-ch.js',
			drawer: './src/assets/styleguide/scripts/drawer.js'
		},
		styles: {
			fabricator: 'src/assets/fabricator/styles/fabricator.scss',
			styleguide: 'src/assets/styleguide/styles/alv-ch.scss'
		},
		sass: 'src/assets/styleguide/styles/**/*',
		js: 'src/assets/styleguide/scripts/**/*',
		images: 'src/assets/styleguide/images/**/*',
		fonts: 'node_modules/font-awesome/fonts/**/*',
		views: 'src/styleguide/views/*.html'
	},
	dest: 'dist',
	build: 'build',
	ghPages: 'docs'

};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
gulp.task('clean', function (cb) {
	del([config.dest], cb);
});


// styles
gulp.task('styles:fabricator', function () {
	gulp.src(config.src.styles.fabricator)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 1 version'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(rename('f.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles:styleguide', function () {
	gulp.src(config.src.styles.styleguide)
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(prefix('last 1 version'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest + '/assets/styleguide/styles'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:styleguide']);

// scripts
gulp.task('scripts', function (done) {
	webpackCompiler.run(function (error, result) {
		if (error) {
			gutil.log(gutil.colors.red(error));
		}
		result = result.toJson();
		if (result.errors.length) {
			result.errors.forEach(function (error) {
				gutil.log(gutil.colors.red(error));
			});
		}
		done();
	});
});


// images
gulp.task('images', ['favicon', 'fonts'], function () {
	return gulp.src(config.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(config.dest + '/assets/styleguide/images'));
});

// fonts
gulp.task('fonts', function () {
	return gulp.src(config.src.fonts)
		.pipe(gulp.dest(config.dest + '/assets/styleguide/fonts'));
});

gulp.task('favicon', function () {
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.dest));
});


// assemble
gulp.task('assemble', function (done) {
	assemble({
		logErrors: config.dev
	});
	done();
});


// clean:build
gulp.task('clean:build', function (cb) {
	del([config.build], cb);
});
// build
gulp.task('styles:build', function () {
	gulp.src(config.src.styles.styleguide)
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(prefix('last 1 version'))
		.pipe(gulpif(!config.dev, csso()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.build + '/css'))
		.pipe(gulpif(config.dev, reload({stream:true})));
});
// images:build
gulp.task('images:build', function () {
	return gulp.src(config.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(config.build + '/images'));
});
// fonts:build
gulp.task('fonts:build', function () {
	return gulp.src(config.src.fonts)
		.pipe(gulp.dest(config.build + '/fonts'));
});
/**
 * Copy images to build
 */
gulp.task('sass-files:build', function() {
	return gulp.src(config.src.sass)
		.pipe(gulp.dest(config.build + '/scss'));
});
gulp.task('sass-files', ['sass-files:build']);

// scripts:build
gulp.task('scripts:build', ['scripts'], function () {
	return gulp.src(config.src.js)
		.pipe(gulp.dest(config.build + '/scripts'));
});

// copy dist to docs for github pages
gulp.task('gh-pages', ['styles'], function() {
	return gulp.src(['dist/**/*']).pipe(gulp.dest(config.ghPages));
});


// server
gulp.task('serve', function () {

	browserSync({
		server: {
			baseDir: config.dest
		},
		notify: false,
		logPrefix: 'FABRICATOR'
	});

	/**
	 * Because webpackCompiler.watch() isn't being used
	 * manually remove the changed file path from the cache
	 */
	function webpackCache(e) {
		var keys = Object.keys(webpackConfig.cache);
		var key, matchedKey;
		for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			key = keys[keyIndex];
			if (key.indexOf(e.path) !== -1) {
				matchedKey = key;
				break;
			}
		}
		if (matchedKey) {
			delete webpackConfig.cache[matchedKey];
		}
	}

	gulp.task('assemble:watch', ['assemble'], reload);
	gulp.watch('src/**/*.{html,md,json,yml}', ['assemble:watch']);

	gulp.task('styles:fabricator:watch', ['styles:fabricator']);
	gulp.watch('src/assets/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

	gulp.task('styles:styleguide:watch', ['styles:styleguide']);
	gulp.watch('src/assets/styleguide/styles/**/*.scss', ['styles:styleguide:watch']);

	gulp.task('scripts:watch', ['scripts'], reload);
	gulp.watch('src/assets/{fabricator,styleguide}/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

	gulp.task('images:watch', ['images'], reload);
	gulp.watch(config.src.images, ['images:watch']);

});

// default build task
gulp.task('build', ['clean:build'], function () {

	// define build tasks
	var tasks = [
		'styles:build',
		'scripts:build',
		'images:build',
		'fonts:build',
		'sass-files:build',
		'gh-pages'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('serve');
		}
	});
});

// default build task
gulp.task('default', ['clean'], function () {

	// define build tasks
	var tasks = [
		'styles',
		'scripts',
		'images',
		'fonts',
		'sass-files',
		'assemble'
	];

	// run build
	runSequence(tasks, function () {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
