'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'lib',
    tmp: '.tmp',
    test: 'test',
    dist: 'dist',
    docs: 'docs'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> - Version <%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %>\n' +
    ' * \n' +
    ' * <%= pkg.description %>\n' +
    ' * \n' +
    ' * Copyright <%= grunt.template.today("yyyy") %>  - <%= pkg.authors.join(", ") %>\n' +
    ' * License <%= pkg.license %>\n' +
    ' */',
    usebanner: {
      build: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: ['<%= app.dist %>/{,*/}*.js']
        }
      }
    },

    // Project settings
    app: appConfig,


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= app.src %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['<%= app.test %>/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/{,*/}*',
            '!<%= app.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },
    es6transpiler: {
      dist: {
        files: {
          '<%= app.dist %>/index.js': 'index.js',
          '<%= app.dist %>/lib/app.tmpl.js': '<%= app.src %>/*.js'
        }
      },
      options: {
        "environments": ["node"],

        "globals": {
          "App": true
        }
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: '<%= app.dist %>',
          src: [
            'LICENSE',
            '*.json',
            '*.MD'
          ]
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'es6transpiler',
    'usebanner'
  ]);
  grunt.registerTask('check', [
    'build'
  ]);

  grunt.registerTask('default', [
    'check'
  ]);
};
