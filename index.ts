import argsHandler from './src/argsHandler.js';
import runTests from './src/runTests.js';

runTests((await argsHandler(process.argv.slice(2))));