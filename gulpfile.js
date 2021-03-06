// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); // ng-min
var rename = require('gulp-rename');
var header = require('gulp-header');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn = require('opn');
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
		.pipe(gulp.dest('docs/assets/js'))
		.pipe(rename('tadkit.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('docs/assets/js'));
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
		'bower_components/ng-flow/dist/ng-flow-standalone.js',
		'bower_components/angular-uuid4/angular-uuid4.js',
		'bower_components/papaparse/papaparse.min.js',
		'bower_components/threejs/build/three.js', // see asset-libs below
		'bower_components/threejs/examples/js/controls/TrackballControls.js',
		'bower_components/threejs/examples/js/controls/OrbitControls.js',
		'bower_components/angular-awesome-slider/dist/angular-awesome-slider.min.js',
		'bower_components/angular-resizable/angular-resizable.min.js',
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/jquery-ui/jquery-ui.min.js',
		'node_modules/angular-ui-grid/ui-grid.min.js',
		'node_modules/xlsx/dist/xlsx.full.min.js',
		'node_modules/file-saver/FileSaver.min.js',
		])
		.pipe(gulp.dest('src/assets/libs'))
		.pipe(concat('vendors.js'))
		.pipe(uglify()) // TODO: test other options eg. ng-min
		.pipe(gulp.dest('docs/assets/js'));
});

// Transfer Demo index.html
gulp.task('app-index', function() {
	return gulp.src([
		'src/tadkit-index.html'
		])
		.pipe(rename('index.html'))
		.pipe(gulp.dest('docs'));
});
// Transfer Favicon Assets
gulp.task('app-favicon', function() {
	return gulp.src([
		'src/favicon-32x32.png'
		])
		.pipe(gulp.dest('docs'));
});

// Transfer Libs used in Services for Demo load
gulp.task('assets-libs', function() {
	return gulp.src([
		'bower_components/angular/angular.min.js.map',
		'bower_components/d3/d3.min.js',
		'bower_components/threejs/build/three.min.js',
		'src/assets/js/igv.js'
		])
		.pipe(gulp.dest('src/assets/js'))
		.pipe(gulp.dest('docs/assets/js'));
});

// Transfer HTML Templates
gulp.task('assets-html', function() {
	return gulp.src([
		'src/components/panels/*.html',
		'src/components/scenes/*.html',
		'src/components/tracks/*.html',
		'src/layout/*.html'
		])
        .pipe(header("<!-- This file is generated — do not edit by hand! -->\n"))
		.pipe(gulp.dest('src/assets/templates'))
		.pipe(gulp.dest('docs/assets/templates'));
});

// Compile Sass
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
		'bower_components/angular-awesome-slider/dist/css/angular-awesome-slider.min.css',
		'bower_components/angular-material/angular-material.css',
		'bower_components/angular-resizable/angular-resizable.min.css',
		'src/assets/css/ensembl-genes.css',
		'src/assets/css/igv.css',
		'src/assets/css/igv.css.map',
		'bower_components/jquery-ui/themes/cupertino/jquery-ui.css',
		'src/assets/css/tadkit.css',
		'node_modules/angular-ui-grid/ui-grid.min.css',
		'node_modules/angular-ui-grid/ui-grid.woff',
		'node_modules/angular-ui-grid/ui-grid.ttf',
		])
		.pipe(gulp.dest('docs/assets/css'));
});

// Transfer Fonts Assets
gulp.task('assets-fonts', function() {
	return gulp.src([
		'src/assets/fonts/*.*',
		])
		.pipe(gulp.dest('docs/assets/fonts'));
});
// Transfer Image Assets
gulp.task('assets-img', function() {
	return gulp.src([
		'src/assets/img/*.png',
		'src/assets/img/*.svg',
		'bower_components/angular-awesome-slider/dist/img/jslider.blue.vertical.png'
		])
		.pipe(gulp.dest('docs/assets/img'));
});
//Transfer Data Assets
gulp.task('assets-data', function() {
	return gulp.src([
		'src/assets/data/BindingSites.wig',
		'src/assets/data/cytoBand.txt',
		'src/assets/data/hg19.fa.fai',
		'src/assets/data/refGene.hg19.bed.gz',
		'src/assets/data/refGene.hg19.bed.gz.tbi'
		])
		.pipe(gulp.dest('docs/assets/data'));
});
// Transfer Defaults
gulp.task('assets-defaults', function() {
	return gulp.src([
		'src/assets/defaults/*.*'
		])
		.pipe(gulp.dest('docs/assets/defaults'));
});
// Transfer Examples
gulp.task('assets-examples', function() {
	return gulp.src([
		'src/assets/examples/readme.txt',
		'src/assets/examples/conf.json',
		'src/assets/examples/models.json'
		])
		.pipe(gulp.dest('docs/assets/examples'));
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
  opn( 'http://' + server.host + ':' + server.port + '/docs');
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch([
		'src/*.js',
		'src/*.html',
		'src/assets/css/*.css',
		'src/assets/defaults/*.*',
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
		'app-index',
		'app-favicon',
		'assets-libs',
		'assets-html',
		'assets-css',
		'assets-fonts',
		'assets-img',
		'assets-data',
		'assets-defaults',
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
	'app-index',
	'app-favicon',
	'assets-libs',
	'assets-html',
	'assets-css',
	'assets-fonts',
	'assets-img',
	'assets-data',
	'assets-defaults',
	'assets-examples',
	'webserver',
	'openbrowser',
	'watch'
	]);



