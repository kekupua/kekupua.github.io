/**
 * Created by Sean on 8/16/2017.
 */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task ('default', ['sass', 'watch']);

gulp.task('sass', function () {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
});