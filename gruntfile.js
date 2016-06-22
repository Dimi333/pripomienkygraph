module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '/*koniec suboru*/;'
			},
			dist: {
				src: [
					'public/angular/angular.min.js',
					'public/angular/angular-route.min.js',
					'public/app/**/*.js',
					'!node_modules'
				],
				dest: 'public/<%= pkg.name %>.js'
			}
		},
		minified: {
			files: {
				src: [
					'public/<%= pkg.name %>.js'
				],
				dest: 'public/min.js'
			},
			options : {
				sourcemap: true,
				allinone: false
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js'],
					tasks: ['jshint'],
					options: {
					spawn: false,
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-minified');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'minified', 'watch']);
};
