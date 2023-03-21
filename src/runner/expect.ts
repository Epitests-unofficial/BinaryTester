import {Runner, Test, Out} from '../modules/types.js';
import { spawnSync, SpawnSyncReturns } from 'child_process';
import jobError from './jobError.js';

function compareStatus(run: Number, test: Test): Boolean {
    if (test.expected.exitCode === undefined) {
        return true;
    }
    return run === test.expected.exitCode;
}

function compareStdout(run: string, test: Test): Boolean {
    if (test.expected.stdout === undefined || (test.expected.stdout.string === undefined && test.expected.stdout.regex === undefined)) {
        return true;
    }
    if (test.expected.stdout.string !== undefined && test.expected.stdout.string !== run)
        return false;
    if (test.expected.stdout.regex !== undefined) {
        let reg = new RegExp(test.expected.stdout.regex);
        return reg.test(run);
    }
}

function compareStderr(run: string, test: Test): Boolean {
    if (test.expected.stderr === undefined || (test.expected.stderr.string === undefined && test.expected.stderr.regex === undefined)) {
        return true;
    }
    if (test.expected.stderr.string !== undefined && test.expected.stderr.string !== run)
        return false;
    if (test.expected.stderr.regex !== undefined) {
        let reg = new RegExp(test.expected.stderr.regex);
        return reg.test(run);
    }
}

async function runExpect(runner: Runner, test: Test): Promise<void> {
    let startTime = Date.now();
    let run: SpawnSyncReturns<Buffer> = spawnSync(test.command, {
        timeout: runner.settings.timeout,
        shell: true
    });
    let endTime = Date.now();
    if (runner.settings.verbose) {
        console.log(`Run stdout: "${run.stdout}"`);
        console.log(`Run stderr: "${run.stderr}"`);
        console.log(`Run exit code: ${run.status}`);
    }
    test.result = {
        status: 'success',
        msg: 'OK',
        result: {
            stdout: run.stdout.toString(),
            stderr: run.stderr.toString(),
            exitCode: run.status
        },
        timeTaken: endTime - startTime
    };
    if (test.result.timeTaken > runner.settings.timeout && runner.settings.timeout !== 0) {
        return jobError(runner, test, `Test timed out after ${test.result.timeTaken}ms`);
    }
    if (!compareStatus(run.status, test)) {
        return jobError(runner, test, `Expected exit code ${test.expected.exitCode} but got ${run.status}`);
    }
    if (!compareStdout(run.stdout.toString(), test)) {
        return jobError(runner, test, `Expected stdout not match with run stdout`);
    }
    if (!compareStderr(run.stderr.toString(), test)) {
        return jobError(runner, test, `Expected stderr not match with run stderr`);
    }
    runner.numberSuccess++;
    if (runner.settings.outputFormat === 'text')
        console.log(`OK`);
}

export default runExpect;