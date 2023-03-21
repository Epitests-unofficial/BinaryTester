import* as fs from 'fs';
import error from '../modules/log.js';
import { Runner, Test, Out } from '../modules/types.js';

function parseOut(test: any): Out {
    let expected: Out = {
        stdout: undefined,
        stderr: undefined,
        exitCode: undefined
    }
    if (test.stdout)
        expected.stdout = test.stdout;
    if (test.stderr)
        expected.stderr = test.stderr;
    if (test.exitCode !== undefined)
        expected.exitCode = test.exitCode;
    return expected;
}

export default async function parse(runner: Runner, doc: any): Promise<Runner> {
    const tests: Test[] = [];
    try {
        let testId = 0;
        for (const test of doc.Tests) {
            testId++;
            const testObj: Test = {
                id: testId,
                name: test.name,
                description: test.description,
                command: test.command,
                testType: test.testType,
                referCommand: undefined,
                expected: undefined,
                result: undefined
            };
            if (test.testType === 'refer')
                testObj.referCommand = test.referCommand;
            else if (test.testType === "expect")
                testObj.expected = parseOut(test.expected);
            else
                throw new Error(`Invalid testType or comparsionType in test ${testObj.id}`);
            tests.push(testObj);
        }
    } catch(e) {
        error(`Error parsing: ${e}`);
    }
    runner.tests = tests;
    return runner;
}
