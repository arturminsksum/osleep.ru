var gulp = require('gulp');
gulp.fs = require("fs");
gulp.postcss = require('gulp-postcss');
gulp.autoprefixer = require('gulp-autoprefixer');
gulp.cssnano = require('gulp-cssnano');
gulp.cssImport = require("postcss-import");
gulp.postcssVars = require("postcss-simple-vars");
gulp.postcssNasted = require("postcss-nested");
// gulp.connect = require('gulp-connect');
gulp.connect = require('gulp-connect-multi')();
gulp.jade = require('gulp-jade');

gulp.preprocessors = [
    gulp.cssImport('dev/assets/css/*.css'),
    gulp.postcssVars,
    gulp.postcssNasted
];

/* watch document change */
gulp.paths = {
    scripts: 'dev/**/*.js',
    jade: 'dev/**/*.jade',
    style: ['dev/jade/**/*.css', 'dev/styles/**/*.css'],
    html: 'dev/assets/cart-prod.html',
    js: 'dev/assets/js/*.js',
    ccs: 'dev/assets/css/*.css'
};

gulp.task('server', gulp.connect.server({
  root: ['dev/assets'],
  port: 9000,
  open: {
    file: 'cart-prod.html'
    // browser: 'chrome'
  },  
  livereload: true
}));

gulp.task('concat', function () {
    return gulp.src('dev/styles/*.css')
        .pipe(gulp.postcss(gulp.preprocessors))
        .pipe(gulp.autoprefixer({browsers: ['last 2 versions']}))
        // .pipe(gulp.cssnano())
        .pipe(gulp.dest('dev/assets/css'))
        .pipe(gulp.connect.reload());
});

gulp.task('jade', function() {
    gulp.src('dev/*.jade')
        .pipe(gulp.jade({
            pretty: true
        }))
        .pipe(gulp.dest('dev/assets'))
        // .pipe(gulp.connect.reload());
});

gulp.task('css', function () {
  gulp.src('dev/assets/css/*.css')
    .pipe(gulp.connect.reload());
});

gulp.task('html', function () {
  gulp.src(gulp.paths.html)
    .pipe(gulp.connect.reload());
});

gulp.task('js', function () {
  gulp.src(gulp.paths.js)
    .pipe(gulp.connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(gulp.paths.style, ['concat']);
    gulp.watch(gulp.paths.jade, ['jade']);
    gulp.watch(gulp.paths.css, ['css']);
    gulp.watch(gulp.paths.html, ['html']);
    gulp.watch(gulp.paths.js, ['js']);
});

gulp.task('default', ['concat', 'jade', 'server', 'watch']);