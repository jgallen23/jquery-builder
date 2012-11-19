#!/usr/bin/env node

var fs = require('fs');
var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version

var opt = require('optimist')
    .usage('jQuery Builder '+ version +'\nUsage: $0')
    .options('e', {
      alias: 'exclude',
      describe: 'Modules to exclude [module,module]',
      type: 'string'
    })
    .option('m', {
      alias: 'minify',
      describe: 'Minify output',
      type: 'boolean'
    })
    .options('l', {
      alias: 'ls',
      describe: 'List available modules',
      type: 'boolean'
    })
    //.options('v', {
      //alias: 'version',
      //describe: 'Version of jQuery to use (1.8.0, 1.8.1, 1.8.2)',
      //type: 'string',
      //default: '1.8.2'
    //})
    .options('h', {
      alias: 'help',
      descripe: 'Show help info'
    });

var argv = opt.argv;

if (argv.help) {
  return opt.showHelp();
}

if (argv.ls) {
  var comp = require('../data').modules;
  console.log('Modules:');
  comp.forEach(function(c) {
    console.log(c);
  });
  return;
}

var exclude = (argv.exclude) ? argv.exclude.split(',') : undefined;

var builder = require('../lib/builder');

builder(exclude, '1.8.3', argv.minify, function(err, source) {
  process.stdout.write(source);
});
