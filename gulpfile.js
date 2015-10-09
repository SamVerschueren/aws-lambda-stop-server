'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to
 * AWS Lambda.
 *
 * @author Sam Verschueren		<sam.verschueren@gmail.com>
 * @since  09 Oct. 2015
 */

// module dependencies
var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var del = require('del');

gulp.task('clean', ['zip'], function () {
	return del('.temp');
});

gulp.task('copyAndInstall', function () {
	return gulp.src(['./index.js', 'package.json', 'LICENSE'])
		.pipe(gulp.dest('.temp'))
		.pipe(install({production: true}));
});

gulp.task('zip', ['copyAndInstall'], function () {
	return gulp.src('.temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('.'));
});

gulp.task('build', ['zip', 'clean']);
gulp.task('default', ['build']);
