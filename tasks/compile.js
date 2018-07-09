'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { ensureDirectory } = require('../lib/validate');
const resolveOutputPath = require('../lib/resolve-output-path');

/**
 * compile
 *
 * Generate correct settings for reading and writing files depending on
 * given arguments. Loads .yml file contets from disc, parse it into a
 * JavaScript object, turn that into a JSON object, finally write that
 * object to selected target file.
 *
 * https://github.com/nodeca/js-yaml
 *
 * @param {string} inputFile  Path of file to be compiled.
 * @param {string} outputDir  Where to output compiled file.
 * @param {string} input      Path where files are being watched.
 * @param {Object} options    Application options.
 */
function compile(inputFile, outputDir, input, { minify, shallow }) {
  const inputPath = path.resolve(inputFile);

  // Get appropriate outputting path depending on various factors
  const outputPath = resolveOutputPath(outputDir, inputPath, input, shallow);

  // Ensure output directory is valid for printing
  ensureDirectory(outputPath);

  // Get contents of input file
  const yamlObject = fs.readFileSync(inputPath, 'utf8');

  // Convert .yml file contents into a js object
  const jsObject = yaml.safeLoad(yamlObject);

  // Use two space indentation unless minify option is active
  const indentation = minify ? 0 : 2;

  // Convert js object into a .json object
  const jsonObject = JSON.stringify(jsObject, null, indentation);

  // Compilation console output
  console.log();
  console.log(`> compile: ${inputPath}`);
  console.log(`> output:  ${outputPath}`);

  // Write .json file to disc
  fs.writeFileSync(outputPath, jsonObject, 'utf8');
}

module.exports = compile;
