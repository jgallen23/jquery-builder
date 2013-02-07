var exec = require('child_process').exec;

module.exports = function(jqueryPath, version, callback) {

  var cmds = [
    'git checkout ' + version,
    'git submodule update',
    'npm install'
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
