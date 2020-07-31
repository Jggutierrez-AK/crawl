'use strict';

var Fiber = require('fibers');

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

sass.compiler = require('sass');

gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  });

  browserSync.watch('src/index.html').on('change', browserSync.reload);
  done()
})

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
  .pipe(sass({fiber: Fiber}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', gulp.series('sass', 'browserSync', function(done) {
  gulp.watch('src/scss/style.scss', gulp.series('sass'));

  done()
}));