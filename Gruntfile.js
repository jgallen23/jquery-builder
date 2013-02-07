module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<config:jshint.all>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'tasks/**/*.js', 'test/**/*.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
