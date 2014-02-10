module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'owasp-password-strength-test.js',
      ],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test.coffee']
      },
    },
  });

  grunt.registerTask('default'  , [ 'jshint', 'mochaTest' ]);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
};
