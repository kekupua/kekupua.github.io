/**
 * Created by Sean on 8/16/2017.
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task ('default', ['sass', 'js', 'watch']);

gulp.task('sass', function () {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
    gulp.src('./assets/js/**/*.jsx')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.jsx', ['js']);
});