'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var mainBowerFiles = require('gulp-main-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var rename = require('gulp-rename');
var del = require('del');
var Q = require('q');
var pump = require('pump');

gulp.task('default', ['watch']);

gulp.task('build', ['build-css', 'inject-js', 'main-bower-files', 'angular-app-files']);

gulp.task('watch', function () {
    gulp.watch('./static/app/sass/**/*.scss', ['build-css', 'build-js']);
});

// removes all compiled dev files
gulp.task('clean-build', function () {
    var deferred = Q.defer();
    del('./static/build/', function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// compile scss into css and move to build
gulp.task('build-css', function () {
    return gulp.src('./static/app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./static/build'));
});

gulp.task('build-js', function (cb) {
    pump([
        gulp.src('./static/**/*.js')
        , angularFilesort()
        , sourcemaps.init()
        , uglify()
        , concat('app.js')
        , sourcemaps.write()
        , rename({
            suffix: '.min'
        })
        , gulp.dest('./static/build')
    ],
        cb
    );
});


gulp.task('angular-app-files', function () {
    return gulp.src(['./static/app/**/*', '!./static/app/**/*.js', '!./static/app/sass/**/*'])
    .pipe(gulp.dest('./static/build'))
});

// concat, uglify, and move main bower files to build
gulp.task('main-bower-files', function () {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                'bootstrap': {
                    'main': [
                        './dist/js/bootstrap.js',
                        './dist/css/*.min.*',
                        './dist/fonts/*.*'
                    ]
                },
                'font-awesome': {
                    'main': [
                        './css/*.min.*',
                        './fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(gulp.dest('./static/build/libs'));
});

gulp.task('inject-js', ['build-js'], function () {
    gulp.src('./static/index.html')
        .pipe(inject(
            gulp.src('./static/build/app.min.js', { read: false }), {ignorePath: 'static'}
        ))
        .pipe(gulp.dest('./static'));
});