var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

var del = require('del');
var runSequence = require('gulp4-run-sequence');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('sass', function(){
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('useref', function(){
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('src/assets/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/assets'))
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('watch', gulp.parallel('sass', 'browserSync'), function(){
  gulp.watch('src/scss/style.scss', gulp.series('sass'));
  gulp.watch('src/index.html', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean', 
    ['sass', 'useref', 'images'],
    callback
  )
});