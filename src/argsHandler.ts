import help from './modules/help.js';
import error from './modules/log.js';
import { Runner } from './modules/types.js';
import parseYaml from './fileParsing/yaml.js';
import parseJson from './fileParsing/json.js';

async function parseArguments(args: string[]): Promise<Runner> {
    let runner: Runner = {
        testFilePath: '',
        tests: [],
        settings: {
            output: 'stdout',
            outputFormat: 'text',
            timeout: -1,
            verbose: false,
            status: false,
            runList: [],
        },
    };
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '-o': case '--output':
                if (args[i + 1] === undefined || args[i + 1] !== 'stdout' && args[i + 1] !== 'stderr')
                    error("Invalid output (must be 'stdout' or 'stderr' or 'file')");
                runner.settings.output = args[i + 1];
                i++;
                break;
            case '-of': case '--output-format':
                if (args[i + 1] === undefined || args[i + 1] !== 'json' && args[i + 1] !== 'text')
                    error('Invalid output format');
                runner.settings.outputFormat = args[i + 1];
                i++;
                break;
            case '-t': case '--timeout':
                if (args[i + 1] === undefined || isNaN(parseInt(args[i + 1])) || parseInt(args[i + 1]) < 0)
                    error('Invalid timeout');
                runner.settings.timeout = parseInt(args[i + 1]);
                i++;
                break;
            case '-v': case '--verbose':
                runner.settings.verbose = true;
                break;
            case '-s': case '--status':
                runner.settings.status = true;
                break;
            case '-r': case '--runList':
                if (args[i + 1] === undefined || args[i + 1].split(',').some((x) => isNaN(parseInt(x))))
                    error('Invalid run list');
                runner.settings.runList = args[i + 1].split(',').map((x) => parseInt(x));
                i++;
                break;
            case '-h': case '--help':
                help();
                process.exit(0);
            default:
                if (args[i].startsWith('-') || args[i].startsWith('--'))
                    error(`Invalid argument: ${args[i]}`);
                runner.testFilePath = args[i];
                break;
        }
    }
    if (runner.testFilePath === '') {
        help();
        process.exit(1);
    }
    if (runner.testFilePath.endsWith('.yaml') || runner.testFilePath.endsWith('.yml'))
        runner = await parseYaml(runner);
    else if (runner.testFilePath.endsWith('.json'))
        runner = await parseJson(runner);
    return runner;
}

export default parseArguments;
export { parseArguments };