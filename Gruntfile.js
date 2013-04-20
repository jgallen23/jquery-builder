module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    watch: {
      files: [
        '<%= jshint.all %>',
        'data.json'
      ],
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'tdd',
          reporter: 'list',
          //grep: 'filename',
          timeout: 20000,
          growl: true
        }
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('dev', ['default', 'watch']);

};
