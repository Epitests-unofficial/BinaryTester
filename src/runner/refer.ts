import {Runner, Test, Out} from '../modules/types.js';
import { spawnSync, SpawnSyncReturns } from 'child_process';
import jobError from './jobError.js';

async function runRefer(runner: Runner, test: Test): Promise<void> {
    let startTime = Date.now();
    let run: SpawnSyncReturns<Buffer> = spawnSync(test.command, {
        timeout: runner.settings.timeout,
        shell: true
    });
    let endTime = Date.now();
    let ref: SpawnSyncReturns<Buffer> = spawnSync(test.referCommand, {
        timeout: runner.settings.timeout,
        shell: true
    });
    if (runner.settings.verbose) {
        console.log(`Run stdout: "${run.stdout}"`);
        console.log(`Run stderr: "${run.stderr}"`);
        console.log(`Refer stdout: "${ref.stdout}"`);
        console.log(`Refer stderr: "${ref.stderr}"`);
        console.log(`Run exit code: ${run.status}`);
        console.log(`Refer exit code: ${ref.status}`);
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
    if (run.status !== ref.status) {
        return jobError(runner, test, `Expected exit code ${test.expected.exitCode} but got ${run.status}`);
    }
    if (run.stdout.toString() !== ref.stdout.toString()) {
        return jobError(runner, test, `Expected stdout not match with run stdout`);
    }
    if (run.stderr.toString() !== ref.stderr.toString()) {
        return jobError(runner, test, `Expected stderr not match with run stderr`);
    }
    runner.numberSuccess++;

    if (runner.settings.outputFormat === 'text')
        console.log(`OK`);
}

export default runRefer;