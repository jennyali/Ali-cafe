var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('./gulp-config');
    sourcemaps = require('gulp-sourcemaps');

    

//==========Gulp Less===================
gulp.task('sass', function(){
    gulp.src(config.sass.src)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            {browsers: ['last 2 versions'],
			cascade: false }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.sass.dest))
});

gulp.task('default', ['sass'], function() {
   gulp.watch(config.sass.watch, ['sass']) 
});
