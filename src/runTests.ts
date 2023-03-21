import { Runner, Test, Out } from './modules/types.js';
import runRefer from './runner/refer.js';
import runExpect from './runner/expect.js';
import yaml from 'js-yaml';
import createOutput from './output.js';

function print_expected(out: Out): void {
    if (out.stdout !== undefined)
        if (out.stdout.string !== undefined)
            console.log(`Expected stdout: "${out.stdout.string}"`);
        else if (out.stdout.regex !== undefined)
            console.log(`stdout must match: /${out.stdout.regex}/`);

    if (out.stderr !== undefined)
        if (out.stderr.string !== undefined)
            console.log(`Expected stderr: "${out.stderr.string}"`);
        else if (out.stderr.regex !== undefined)
            console.log(`stderr must match: /${out.stderr.regex}/`);
    
    if (out.exitCode !== undefined)
        console.log(`Expected exit code: ${out.exitCode}`);
}

function print_test_description(test: Test): void {
    console.log(`Test ${test.id}: ${test.name}`);
    console.log(`Test Command: $${test.command}`);
    console.log(`Test type: [${test.testType}]`);
    if (test.testType === 'refer')
        console.log(`Refer Command: $${test.referCommand}`);
    else {
        print_expected(test.expected);
    }
}

async function runTest(runner: Runner, test: Test): Promise<void> {
    if (runner.settings.verbose) {
        print_test_description(test);
    } else if (runner.settings.outputFormat == 'text') 
        process.stdout.write(`Test ${test.id}: ${test.name}... \t`);
    
    if (test.testType === 'refer')
        await runRefer(runner, test);
    else if (test.testType === 'expect')
        await runExpect(runner, test);
    if (runner.settings.verbose)
        console.log('\n');
}

export default async function runTests(runner: Runner): Promise<void> {
    if (runner.settings.verbose) {
        console.log(`Starting Tests for ${runner.testFilePath}...`);
        console.log(`Settings: \n${yaml.dump(runner.settings)}`);
        console.log("Test Queue:");
        for (const test of runner.tests) {
            if (runner.settings.runList.includes(test.id) || runner.settings.runList.length === 0)
                console.log(`Test ${test.id}: ${test.name}`);
        }
    }
    if (runner.settings.outputFormat == 'text')
        console.log("Starting Tests...\n");
    for (const test of runner.tests) {
        if (runner.settings.runList.includes(test.id) || runner.settings.runList.length === 0) {
            test.result = {
                status: 'pending',
                msg: 'In the queue',
                result: {
                    stdout: undefined,
                    stderr: undefined,
                    exitCode: undefined
                },
                timeTaken: undefined
            };
        } else {
            test.result = {
                status: 'skipped',
                msg: 'Skipped by user',
                result: {
                    stdout: undefined,
                    stderr: undefined,
                    exitCode: undefined
                },
                timeTaken: undefined
            };
        }
    }
    for (const test of runner.tests) {
        if (runner.settings.runList.includes(test.id) || runner.settings.runList.length === 0) {
            test.result = {
                status: 'pending',
                msg: 'In the queue',
                result: {
                    stdout: undefined,
                    stderr: undefined,
                    exitCode: undefined
                },
                timeTaken: undefined
            };
            await runTest(runner, test);
        }
    }
    createOutput(runner);
}
