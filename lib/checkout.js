var exec = require('child_process').exec;

module.exports = function(jqueryPath, version, callback) {

  var cmds = [
    'git checkout ' + version,
    'git submodule update',
    'rm -rf node_modules',
    'npm install',
    'grunt'
  ];
  exec(cmds.join(' && '), {
    cwd: jqueryPath
  }, function(err) {
    if (err) {
      return callback(err);
    }

    callback(null, version);

  });

};
