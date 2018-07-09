'use strict';

const path = require('path');
const chokidar = require('chokidar');
const compile = require('./compile');

/**
 * watch
 *
 * Initializes a Chokidar watcher object with received arguments and runs it.
 * The object watches for changes in .yml files under a given directory,
 * compiles those files and outputs them as .json to chosen destination.
 *
 * https://github.com/paulmillr/chokidar
 *
 * @param {string} input    Where to watch for file changes.
 * @param {string} output   Where to output compiled files.
 * @param {Object} options  Application options.
 */
function watch(input, output, options) {
  // If input directory has an extension, i.e is a file, use received path.
  // Else create pattern that matches any .yml files under that directory.
  // A joined path pattern must replace any '\' with '/' to work correctly.
  const watchPattern = path.extname(input)
    ? input
    : path.join(input, '**/*.yml').replace(/\\/g, '/');

  const watchOptions = {
    // Ignore .dotfiles and /node_modules
    ignored: /(^|[/\\])(\.|node_modules)./
  };

  chokidar
    .watch(watchPattern, watchOptions)
    .on('add', file => console.log(`watching: ${file}`))
    .on('change', file => compile(file, output, input, options));
}

module.exports = watch;
