var gulp        = require('gulp');
var gutil       = require('gulp-util');
var bower       = require('bower');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var sh          = require('shelljs');
var inject      = require('gulp-inject');
var ngAnnotate  = require('gulp-ng-annotate');
var series      = require('stream-series');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'index', 'annotate']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('index', function () {
  var target = gulp.src('./www/index.html');
  var modules = gulp.src('./www/app/**/*module.js', {read: false});
  var other = gulp.src(['./www/app/**/*.js', '!./www/app/**/*module.js'], {read: false});

  return target
    .pipe(inject(series(modules, other), {relative: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('annotate', function () {
  return gulp.src(['./www/app/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./www/app'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
