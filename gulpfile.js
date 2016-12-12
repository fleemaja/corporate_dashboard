require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('default', ['styles', 'scripts'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
