// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src([
		'src/*.js',
		'src/components/scene/*.js',
		'src/components/track/*.js',
		'src/layout/*.js',
		'src/services/*.js',
		])
        .pipe(jshint({ devel: true }))
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('css'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
		'src/*.js',
		'src/components/scene/*.js',
		'src/components/track/*.js',
		'src/layout/*.js',
		'src/services/*.js',
		])
		// eg. file order  gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])

        .pipe(concat('tadkit.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('tadkit.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch([
		'src/*.js',
		'src/components/scene/*.js',
		'src/components/track/*.js',
		'src/layout/*.js',
		'src/services/*.js',
		], ['lint', 'scripts']);
    // gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);