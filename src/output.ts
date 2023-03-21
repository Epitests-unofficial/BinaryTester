import yaml from 'js-yaml';
import* as fs from 'fs';
import { Runner, Output } from './modules/types.js';
import error from './modules/log.js';

function constructReturn(runner: Runner): Output {
    const output: Output = {
        success: (runner.numberSuccess === runner.tests.length) ? true : false,
        numberSuccess: runner.numberSuccess,
        numberFail: runner.numberFail,
        numberSkipped: runner.tests.length - runner.numberFail - runner.numberSuccess,
        testResults: []
    };
    for (const test of runner.tests) {
        output.testResults.push(test);
    }
    return output;
}

export function returnJson(runner: Runner): string {
    return JSON.stringify(constructReturn(runner));
}

export function returnYaml(runner: Runner): string {
    return yaml.dump(constructReturn(runner));
}

function print_end(runner: Runner): void {
    if (runner.settings.verbose)
        console.log("Finished Tests!");
    if (runner.settings.outputFormat == 'text')
        console.log(`\nTests Results
->\tSuccess: ${runner.numberSuccess}\tFail: ${runner.numberFail} \tSkipped: ${runner.tests.length - runner.numberFail - runner.numberSuccess}\t<-`);
}

export default function createOutput(runner: Runner): void {
    let output: string;
    switch (runner.settings.outputFormat) {
        case 'json':
            output = returnJson(runner);
            break;
        case 'yaml':
            output = returnYaml(runner);
            break;
        default:
            print_end(runner);
            break;
    }
    try {
        if (output !== undefined)
            fs.writeFileSync(runner.settings.output, output);
    } catch (err) {
        error(`Error writing to file: ${err}`);
    }
    if (runner.settings.status && runner.numberFail > 0)
        process.exit(1);
}
