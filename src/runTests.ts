import { Runner, Test, Out } from './modules/types.js';
import runRefer from './runner/refer.js';

function print_expected(out: Out): void {
    console.log(`Expected stdout: ${out.stdout}`);
    console.log(`Expected stderr: ${out.stderr}`);
    console.log(`Expected exit code: ${out.exitCode}`);
}

function print_test_description(test: Test): void {
    console.log(`Test ${test.id}: ${test.name}\n\n${test.description}\n\n`);
    console.log(`Test Command: $${test.command}\n\n`);
    console.log(`Test type: [${test.testType}]\n\n`);
    if (test.testType === 'refer')
        console.log(`Refer Command: $${test.referCommand}\n\n`);
    else {
        console.log(`Comparsion type: [${test.comparsionType}]\n\n`);
        console.log(`Expected output: ${test.expected}\n\n`);
    }
}

function runTest(runner: Runner, test: Test): boolean {
    if (runner.settings.verbose) {
        print_test_description(test);
    }
    process.stdout.write(`Running test ${test.id}: ${test.name}... `);
    if (test.testType === 'refer')
        return runRefer(runner, test);
}
