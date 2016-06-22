module.exports = function (grunt) {
	var coreJsFiles = [
		// Core
		'src/this-play.core.js',

		// classes
		'src/models/this-play.classes.item.js',
		
		// models
		'src/models/this-play.models.array.js',

		// controllers
		'src/controllers/this-play.controllers.array.js'
	]

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: coreJsFiles
		},
		concat: {
			basic: {
				src: coreJsFiles,
				dest: 'build/this-play.js'
			}
		},
		uglify: {
			options: {
				banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> /'
			},
			build: {
				src: 'build/this-play.js',
				dest: 'build/this-play.min.js'
			}			
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
}