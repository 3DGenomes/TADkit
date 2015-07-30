// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); // ng-min
var rename = require('gulp-rename');
var plumber   = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var server = {
  host: 'localhost',
  port: '8001'
}

// Lint Task
gulp.task('lint', function() {
	return gulp.src([
		'src/*.js',
		'src/components/*.js',
		'src/components/panels/*.js',
		'src/components/scenes/*.js',
		'src/components/tracks/*.js',
		'src/layout/*.js',
		'src/services/*.js',
		])
		.pipe(jshint({ devel: true }))
		.pipe(jshint.reporter('default'));
});

// Concatenate & Minify TADkit JS
gulp.task('dist-scripts', function() {
	return gulp.src([
		'src/tadkit.js',
		'src/tadkit.config.js',
		'src/tadkit.run.js',
		'src/tadkit.states.js',
		'src/components/*.js',
		'src/components/panels/*.js',
		'src/components/scenes/*.js',
		'src/components/tracks/*.js',
		'src/layout/*.js',
		'src/services/*.js',
		])
		.pipe(concat('tadkit.js'))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('demo/assets/js'))
		.pipe(rename('tadkit.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('demo/assets/js'));
});

// Transfer Vendor JS
// ¡¡¡ LOAD ORDER IS IMPORTANT !!!
gulp.task('dist-vendor', function() {
	return gulp.src([
		'bower_components/angular/angular.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-material/angular-material.js',
		'bower_components/angular-file-upload/angular-file-upload.js',
		'bower_components/ng-flow/dist/ng-flow-standalone.js',
		'bower_components/angular-uuid4/angular-uuid4.js',
		'bower_components/papaparse/papaparse.min.js',
		'bower_components/d3/d3.min.js',
		'bower_components/threejs/build/three.js',
		'bower_components/threejs/examples/js/controls/TrackballControls.js',
		'bower_components/threejs/examples/js/controls/OrbitControls.js',
		])
		.pipe(gulp.dest('src/assets/libs'))
		.pipe(concat('vendors.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('demo/assets/js'));
});

// Transfer Demo index.html
gulp.task('demo-index', function() {
	return gulp.src([
		'src/demo-index.html'
		])
		.pipe(rename('index.html'))
		.pipe(gulp.dest('demo'));
});
// Transfer Favicon Assets
gulp.task('demo-favicon', function() {
	return gulp.src([
		'src/favicon-32x32.png'
		])
		.pipe(gulp.dest('demo'));
});

// Transfer Libs used in Services for local offline load
gulp.task('assets-libs', function() {
	return gulp.src([
		'bower_components/angular/angular.min.js.map',
		'bower_components/d3/d3.min.js',
		'bower_components/threejs/build/three.min.js',
		])
		.pipe(gulp.dest('src/assets/js'))
		.pipe(gulp.dest('demo/assets/js'));
});

// Transfer HTML Templates
gulp.task('assets-html', function() {
	return gulp.src([
		'src/components/panels/*.html',
		'src/components/scenes/*.html',
		'src/components/tracks/*.html',
		'src/layout/*.html'
		])
        // .pipe(header("<!-- This file is generated — do not edit by hand! -->\n"))
		.pipe(gulp.dest('src/assets/templates'))
		.pipe(gulp.dest('demo/assets/templates'));
});

// Compile Our Sass
// gulp.task('assets-sass', function() {
// 	return gulp.src('src/scss/*.scss')
// 		.pipe(sass({
// 			includePaths: ['src/assets/scss'],
// 			outputStyle: 'nested',
// 			errLogToConsole: true
// 		}))
// 		.pipe(gulp.dest('src/assets/css'));
// });
// Transfer CSS Assets
gulp.task('assets-css', function() {
	return gulp.src([
		'src/assets/css/angular-material.css',
		'src/assets/css/tadkit.css',
		'src/assets/css/ensembl-genes.css',
		])
		.pipe(gulp.dest('demo/assets/css'));
});

// Transfer Fonts Assets
gulp.task('assets-fonts', function() {
	return gulp.src([
		'src/assets/fonts/*.*',
		])
		.pipe(gulp.dest('demo/assets/fonts'));
});
// Transfer Image Assets
gulp.task('assets-img', function() {
	return gulp.src([
		'src/assets/img/*.png'
		])
		.pipe(gulp.dest('demo/assets/img'));
});

// Transfer Defaults
gulp.task('assets-defaults', function() {
	return gulp.src([
		'src/assets/defaults/*.*'
		])
		.pipe(gulp.dest('demo/assets/defaults'));
});
// Transfer Offline
gulp.task('assets-offline', function() {
	return gulp.src([
		'src/assets/offline/*.*'
		])
		.pipe(gulp.dest('demo/assets/offline'));
});
// Transfer Examples
gulp.task('assets-examples', function() {
	return gulp.src([
		'src/assets/examples/*.*'
		])
		.pipe(gulp.dest('demo/assets/examples'));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
	.pipe(webserver({
	  host:             server.host,
	  port:             server.port,
	  livereload:       false,
	  directoryListing: false
	}));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port + '/src/index.html');
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch([
		'src/*.js',
		'src/*.html',
		// 'src/assets/css/*.css',
		'src/assets/defaults/*.*',
		'src/assets/offline/*.*',
		'src/assets/examples/*.*',
		'src/components/*.js',
		'src/components/panels/*.js',
		'src/components/panels/*.html',
		'src/components/scenes/*.js',
		'src/components/scenes/*.html',
		'src/components/tracks/*.js',
		'src/components/tracks/*.html',
		'src/layout/*.js',
		'src/layout/*.html',
		'src/services/*.js'
	], [
		'lint',
		// 'sass',
		'dist-scripts',
		'dist-vendor',
		'demo-index',
		'demo-favicon',
		'assets-libs',
		'assets-html',
		'assets-css',
		'assets-fonts',
		'assets-img',
		'assets-defaults',
		'assets-offline',
		'assets-examples'
	]);
	// gulp.watch('src/assets/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', [
	'lint',
	// 'sass',
	'dist-scripts',
	'dist-vendor',
	'demo-index',
	'demo-favicon',
	'assets-libs',
	'assets-html',
	'assets-css',
	'assets-fonts',
	'assets-img',
	'assets-defaults',
	'assets-offline',
	'assets-examples',
	'webserver',
	'openbrowser',
	'watch'
	]);



