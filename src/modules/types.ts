export type Out = {
    stdout: string;
    stderr: string;
    exitCode: number;
}

export type Test = {
    id: number;
    name: string;
    description: string;
    command: string;
    testType: 'refer' | 'string';
    referCommand: string;
    comparsionType: 'string' | 'regex';
    expected: Out;
    regex: Out;
}

export type Settings = {
    output: string;
    outputFormat: string;
    timeout: number;
    verbose: boolean;
    status: boolean;
    runList: Array<number>;
}

export type Runner = {
    testFilePath: string;
    tests: Array<Test>;
    settings: Settings;
}
