'use strict';

const path = require('path');

/**
 * resolveOutputPath
 *
 * Constructs appropriate file path depending on given arguments
 * and chosen options.
 *
 * @param {string} output    Where to output compiled file.
 * @param {string} file      Path of file to be compiled.
 * @param {string} input     Path where files are being watched.
 * @param {boolean} shallow  Shallow output option.
 */
function resolveOutputPath(output, file, input, shallow) {
  const filePath = path.resolve(file);

  // If no output path, return file path but with a .json extension
  if (!output) {
    return filePath.replace(path.extname(filePath), '.json');
  }

  const outputPath = path.resolve(output);

  // If output path has a file extension, output to that file exactly
  if (path.extname(output) === '.json') {
    return outputPath;
  }

  // If shallow output option is active, output directly to that directory
  if (shallow) {
    return path.join(
      outputPath,
      path.basename(filePath).replace('.yml', '.json')
    );
  }

  const inputPath = path.resolve(input);

  // Return output path joined with files deeper folder structure
  return path.join(
    outputPath,
    filePath.replace(inputPath, '').replace('.yml', '.json')
  );
}

module.exports = resolveOutputPath;
