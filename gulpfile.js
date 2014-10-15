// Include do Gulp
var gulp = require('gulp');
// Include de outros plugins do gulp
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
// Variáveis de controle
var jsFiles = 'front/js/*.js';
var styleFiles = 'front/css/less/*.less';

/* Boas práticas para minificação dos js*/
gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}); 

/* Compila o less para css */
gulp.task('less', function () {
  gulp.src(styleFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))    
    .pipe(minifyCss({keepBreaks: false}))
    .pipe(gulp.dest('front/css'));
});

/* Concatena as libs já minificadas utilizadas no projeto */
gulp.task('concat-lib', ['lint'], function() {
    return gulp.src(lib)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('front/js/min'));
});

/* Minifica os js utilizando a task do lint*/
gulp.task('minify', ['lint'], function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('front/js/min'));
});

/* Minifica o tamanho das imagens */
gulp.task('images-opt', function () {
    gulp.src('front/image/original/*.*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true
        }))
        .pipe(gulp.dest('front/image'));
});

/* watch para alteração em tempo real [não utilizado por enquanto] */
gulp.task('watch', function() {
    gulp.watch(jsFiles, ['minify']);
    gulp.watch(styleFiles, ['less']);
});

/* Nodemon chamando a function do what*/
gulp.task('demon', function () {
  nodemon({
    script: 'back/bin/www',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('change', ['watch'])
});

// Default Task
gulp.task('default', ['demon', 'minify', 'less', 'images-opt', ]);
