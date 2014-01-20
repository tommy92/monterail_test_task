'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		haml: {
			dist: {
				files: {
					'source/index.html' : 'build/index.haml'
				}
			}
		},

		compass: {
			dev: {
				options: {
					sassDir: ['build/css'],
					cssDir: ['source/css'],
					environment: 'development',
					outputStyle: 'nested',
					noLineComments: true
				}
			}
		},

		concat: {
			options: {
				separator: '\n',
			},

			dist: {
				src: ['build/js/app.js'],
				dest: 'source/js/app.js',
			},
		},

		watch: {
			sass: {
				files: ['build/css/*.scss'],
				tasks: ['compass:dev']
			},

			haml: {
				files: 'build/*.haml',
				tasks: ['haml']
			},

			scripts: {
				files: 'build/js/*.js',
				tasks: ['concat']
			},

			gruntfile: {
				files: 'Gruntfile.js'
			},

			options: {
				livereload: true
			}
		},

		connect: {
      server: {
        options: {
          port: 8001,
          base: './source'
        }
      }
    }

	});

	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('dev', ['connect', 'watch']);
};