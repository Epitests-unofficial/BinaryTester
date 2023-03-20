import argsHandler from './src/argsHandler.js';

console.log((await argsHandler(process.argv.slice(2))));