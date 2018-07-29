'use strict';

const fse = require('fs-extra');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const ourDir = path.join(projectRoot, 'dist');

/**
 * Executes all pre-build functions to prepare for the TypeScript compile process.
 */
async function main () {
  try {
    await _cleanOutDir();
    console.log(`Successfully cleaned the '${ourDir}' directory`);
    process.exit(0);
  }
  catch (err) {
    console.error(`There was an error cleaning the '${ourDir}' directory: ${err.message}`);
    process.exit(1);
  }
}

main();

// HELPER FUNCTIONS

/**
 * Deletes the directory specified in tsconfig.json by 'outDir' and recreates it.
 * @private
 */
async function _cleanOutDir() {
  await fse.remove(ourDir);
  await fse.ensureDir(ourDir);
}
