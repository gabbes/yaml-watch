'use strict';

const fs = require('fs');
const path = require('path');

/**
 * ensureDirectory
 *
 * Ensures a directory exists by recursively checking
 * and creating missing structure.
 *
 * @param {string} full  The directory that must exist.
 */
function ensureDirectory(full) {
  const dir = path.dirname(full);

  if (fs.existsSync(dir)) {
    return true;
  }

  ensureDirectory(dir);

  return fs.mkdirSync(dir);
}

/**
 * validateInput
 *
 * Validate a given input path string.
 *
 * @param {string} str  A path string.
 */
function validateInput(str) {
  // If received path does not exist, throw error
  if (!fs.existsSync(str)) {
    throw new Error('Received input path does not exist.');
  }

  // If received path has a file extension and it's not .yml, throw error
  if (!!path.extname(str) && path.extname(str) !== '.yml') {
    throw new Error('Received input file is not a .yml file.');
  }

  return true;
}

/**
 * validateOutput
 *
 * Validate a given output path string.
 *
 * @param {string} str  A path string.
 */
function validateOutput(str) {
  // If str exists but isn't pathable, throw error
  if (str.length > 0 && !path.resolve(str)) {
    return new Error('Received output directory not valid.');
  }

  return true;
}

module.exports = {
  ensureDirectory,
  validateInput,
  validateOutput
};
