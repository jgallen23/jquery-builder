#!/usr/bin/env node

var opt = require('optimist')
    .usage('jQuery Builder\nUsage: $0')
    .options('e', {
      alias: 'exclude',
      describe: 'Components to exclude [component,component]',
      type: 'string'
    })
    .option('m', {
      alias: 'minify',
      describe: 'Minify output',
      type: 'boolean'
    })
    .options('l', {
      alias: 'ls',
      describe: 'List available components',
      type: 'boolean'
    })
    .options('h', {
      alias: 'help',
      descripe: 'Show help info'
    });

var argv = opt.argv;

if (argv.help) {
  return opt.showHelp();
}

if (argv.ls) {
  var comp = require('../components');
  console.log('Components:');
  comp.forEach(function(c) {
    console.log(c);
  });
  return;
}

var exclude = (argv.exclude) ? argv.exclude.split(',') : undefined;

var builder = require('../lib/builder');

builder(exclude, argv.minify, function(err, source) {
  process.stdout.write(source);
});
