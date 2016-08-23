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
    gulp.watch('src/main/resources/static/app/sass/**/*.scss', ['build-css', 'build-js']);
});

// removes all compiled dev files
gulp.task('clean-build', function () {
    var deferred = Q.defer();
    del('src/main/resources/static/build/', function () {
        deferred.resolve();
    });
    return deferred.promise;
});

// compile scss into css and move to build
gulp.task('build-css', function () {
    return gulp.src('src/main/resources/static/app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/main/resources/static/build'));
});

gulp.task('build-js', function (cb) {
    pump([
        gulp.src('src/main/resources/static/**/*.js')
        , angularFilesort()
        , sourcemaps.init()
        , uglify()
        , concat('app.js')
        , sourcemaps.write()
        , rename({
            suffix: '.min'
        })
        , gulp.dest('src/main/resources/static/build')
    ],
        cb
    );
});


gulp.task('angular-app-files', function () {
    return gulp.src(['src/main/resources/static/app/**/*', '!src/main/resources/static/app/**/*.js', '!src/main/resources/static/app/sass/**/*'])
        .pipe(gulp.dest('src/main/resources/static/build'))
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
        .pipe(gulp.dest('src/main/resources/static/build/libs'));
});

gulp.task('inject-js', ['build-js'], function () {
    gulp.src('src/main/resources/static/index.html')
        .pipe(inject(
            gulp.src('src/main/resources/static/build/app.min.js', { read: false }), { ignorePath: 'src/main/resources/static' }
        ))
        .pipe(gulp.dest('src/main/resources/static'));
});