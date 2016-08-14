'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch']);

// compile scss into css
gulp.task('build-css', function () {
    return gulp.src('static/app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/app/styles'));
});

gulp.task('watch', function () {
    gulp.watch('static/app/sass/**/*.scss', ['build-css']);
});