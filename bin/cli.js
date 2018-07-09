#!/usr/bin/env node

'use strict';

const yamlWatch = require('../yaml-watch');

/*
 * CLI
 *
 * Require Yargs and parse command options string. Destruct argument and
 * option values from result.
 *
 * http://yargs.js.org/docs/
 */

const {
  _: [input],
  output,
  minify,
  shallow
} = require('yargs')
  .usage('Usage:\n  $0 <dir> [options]')
  .version('v')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .option('o', {
    alias: 'output',
    demand: false,
    describe: 'Set output directory or file',
    type: 'string'
  })
  .option('m', {
    alias: 'minify',
    demand: false,
    describe: 'Minify compiled output',
    type: 'boolean'
  })
  .option('s', {
    alias: 'shallow',
    demand: false,
    describe: 'Output without folder structure',
    type: 'boolean'
  })
  .example(
    '$0 ./src -o ./dist/data.json -m',
    'Watches .yml files under /src, outputs to /dist/data.json file minified.'
  ).argv;

// Display greeting message
console.log();
console.log('  *~~~~~~~~~~~~~~~~~~*');
console.log('  *~~~ yaml watch ~~~*');
console.log('  *~~~~~~~~~~~~~~~~~~*');
console.log();

const options = { minify, shallow };

// Require and run yaml-watch with received arguments
yamlWatch(input, output, options);
