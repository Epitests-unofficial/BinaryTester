export type Match = {
    string: string;
    regex: string;
}

export type Out = {
    stdout: Match;
    stderr: Match;
    exitCode: number;
}

export type Result = {
    status: 'success' | 'fail' | 'skipped' | 'pending';
    msg: string;
    result: {
        stdout: string;
        stderr: string;
        exitCode: number;
    };
    timeTaken: number;
}

export type Test = {
    id: number;
    name: string;
    description: string;
    command: string;
    testType: 'refer' | 'expect';
    referCommand: string;
    expected: Out;
    result: Result;
}

export type Settings = {
    output: string;
    outputFormat: string;
    timeout: number;
    verbose: boolean;
    status: boolean;
    runList: Array<number>;
    stopWhenFail: boolean;
}

export type Runner = {
    testFilePath: string;
    tests: Array<Test>;
    settings: Settings;
    numberSuccess: number;
    numberFail: number;
}

export type Output = {
    success: boolean;
    numberSuccess: number;
    numberFail: number;
    numberSkipped: number;
    testResults: Array<Test>;
}
