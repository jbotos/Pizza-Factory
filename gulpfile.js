'use strict';

// npm install gulp-sass gulp-livereload browser-sync gulp-concat-css gulp-clean main-bower-files gulp-filter gulp-concat gulp-uglify gulp-util gulp-rename

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gulpFilter	= require('gulp-filter'),
	gzip = require('gulp-gzip'),
	concat		= require('gulp-concat'),
	uglify			= require('gulp-uglify'),
    order = require('gulp-order'),
    imageop = require('gulp-image-optimization'),
    imagemin = require('gulp-imagemin'),
	rename		= require('gulp-rename');

/*-------------------------------------------------------------------------*/
/*  FILTERS
/*-------------------------------------------------------------------------*/
var jsFilter	= gulpFilter('*.js');
var cssFilter	= gulpFilter('*.css');
var scssFilter	= gulpFilter(['*.scss', '*.sass']);
var fontFilter	= gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
var imageFilter	= gulpFilter(['*.gif', '*.png', '*.svg', '*.jpg', '*.jpeg']);

var config = {
    images: 'public/images/',
     sass_path: 'scss/*.scss',
    js_folder: 'public/js/src',
    js_path: 'public/js/src/**/*.js',
    //js_folder_path: './craft/templates/_js/**/*.js',
    bootstrap: 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap' ,
     node_modules: 'node_modules' 
}

gulp.task('templates-sass', function() {
	gulp.src([config.sass_path])
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat("default.min.css"))
		//.pipe(gzip())
		.pipe(gulp.dest("css"))
});

gulp.task('templates-js', function() {
	gulp.src([config.js_path])
		//.pipe(jsFilter)
        .pipe(order([
            "_vendor/jquery-3.1.1.min.js",
            "_vendor/bootstrap.min.js",
            "_vendor/bootstrap-multiselect.js",
            "_vendor/ie10-viewport-bug-workaround.js",
            "_vendor/jquery.matchHeight-min.js",
            "_vendor/*.js",
            "init.js",
            "*.js"
        ]))
		.pipe(uglify())
        .pipe(concat("_.js"))
		//.pipe(gzip({ append: false }))
		.pipe(gulp.dest("./js"))
});

gulp.task('images', function(cb) {
    gulp.src([config.images + '*.png', config.images + '*.jpg', config.images + '*.gif', config.images + '*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('./img')).on('end', cb).on('error', cb);
});

/*-------------------------------------------------------------------------*/
/*  TASKS
/*-------------------------------------------------------------------------*/

gulp.task('default', function() {
	gulp.watch([config.sass_path, './scss/*/*.scss'], ['templates-sass']);
	//gulp.watch([config.js_path], ['templates-js']);
});
