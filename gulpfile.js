'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to
 * AWS Lambda.
 *
 * @author Sam Verschueren		<sam.verschueren@gmail.com>
 * @since  09 Oct. 2015
 */

// module dependencies
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var del = require('del');
var pkg = require('./package.json');

gulp.task('clean', ['zip'], function () {
	return del('.temp');
});

gulp.task('rmaws', ['copyAndInstall'], function () {
	return del('.temp/node_modules/aws-sdk');
});

gulp.task('copyAndInstall', function () {
	var files = ['package.json'].concat(pkg.files);

	if (pkg.files === undefined) {
		files = ['./**', '!./**/*.md', '!gulpfile.js', '!./{dist,dist/**}', '!./{test,test/**}', '!./{node_modules,node_modules/**}'];
	} else {
		files = files.map(function (file) {
			try {
				if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
					return path.join(file, '**/*');
				}
			} catch (err) {
				// do nothing
			}

			return file;
		});
	}

	return gulp.src(files, {base: '.'})
		.pipe(strip())
		.pipe(removeEmptyLines())
		.pipe(gulp.dest('.temp'))
		.pipe(install({production: true}));
});

gulp.task('zip', ['copyAndInstall', 'rmaws'], function () {
	return gulp.src('.temp/**')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['copyAndInstall', 'rmaws', 'zip', 'clean']);
gulp.task('default', ['build']);
