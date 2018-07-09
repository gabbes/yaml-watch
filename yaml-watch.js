'use strict';

const watch = require('./tasks/watch');
const { validateInput, validateOutput } = require('./lib/validate');

/**
 * yamlWatch
 *
 * Receives application argument and validates them. If any errors, exit
 * process. Else continue and initialize watcher object with given arguments.
 *
 * @param {string} input    Watches files here. Defaults to current directory.
 * @param {string} output   Where to output compiled files.
 * @param {Object} options  Application options.
 */
function yamlWatch(input = './', output = '', options = {}) {
  try {
    validateInput(input);

    if (output) {
      validateOutput(output);
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }

  // Initialize watcher object
  watch(input, output, options);
}

module.exports = yamlWatch;
