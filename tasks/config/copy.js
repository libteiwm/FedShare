/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			},{
				expand: true,
				cwd: './bower_components',
				src: [
					'angular/angular.js',
					'angular-translate/angular-translate.min.js',
					'jquery/dist/jquery.min.js',
					'bootstrap/dist/js/bootstrap.min.js',
					'angular-bootstrap/ui-bootstrap.min.js',
					'angular-bootstrap/ui-bootstrap-tpls.min.js',
					'angular-translate/angular-translate.min.js',
					'angular-smart-table/dist/smart-table.min.js'
				],
				flatten: true,
				dest: '.tmp/public/js/dependencies'
			},{
				expand: true,
				cwd: './bower_components',
				src: [
					'bootstrap/dist/css/bootstrap.min.css',
					'bootstrap/dist/css/bootstrap-theme.css'
				],
				flatten: true,
				dest: '.tmp/public/styles'
			},{
				expand: true,
				cwd: './bower_components',
				src: [
					'bootstrap/dist/fonts/*'
				],
				flatten: true,
				dest: '.tmp/public/fonts'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
