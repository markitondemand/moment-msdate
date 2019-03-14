'use strict';

module.exports = (grunt) => {
	grunt.initConfig({
		eslint: {
			target: ['**/*.js', '!node_modules/**']
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'nyan'
				},
				src: ['test/**/*.js']
			}
		},
		watch: {
			config: {
				files: './Gruntfile.js',
				options: {
					reload: true
				}
			},
			tests: {
				files: ['test/**.js', '!node_modules/**', './moment-msdate.js'],
				tasks: ['test'],
				options: {
					spawn: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', ['eslint', 'mochaTest']);
};