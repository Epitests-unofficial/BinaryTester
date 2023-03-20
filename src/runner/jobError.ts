import {Runner, Test, Out} from '../modules/types.js';
import createOutput from '../output.js';

export default function jobError(runner: Runner, test: Test, msg: string): void {
    test.result.status = 'fail';
    test.result.msg = msg;
    if (runner.settings.outputFormat === 'text') {
        console.log(`Failed: ${msg}`);
    }
    runner.numberFail++;
    if (runner.settings.stopWhenFail) {
        if (runner.settings.outputFormat === 'text') {
            console.log("You have chosen to stop when a test fails.");
            console.log("Stopping Tests...");
        }
        for (const test of runner.tests) {
            if (test.result.status === 'pending') {
                test.result.status = 'skipped';
                test.result.msg = 'Skipped: Test stopped due to previous failure';
            }
        }
        createOutput(runner);
        if (runner.settings.status)
            process.exit(1);
        else
            process.exit(0);
    }
}
