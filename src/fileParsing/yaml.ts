import* as fs from 'fs';
import* as yaml from 'js-yaml';
import error from '../modules/log.js';
import { Runner, Test, Out } from '../modules/types.js';
import parse from './parse.js';


export default async function parseYaml(runner: Runner): Promise<Runner> {
    let data = fs.readFileSync(runner.testFilePath, 'utf8');
    if (!data) error(`Error reading file from disk: ${runner.testFilePath}`);
    try {
        return await parse(runner, yaml.load(data));
    } catch(e) {
        error(`Error parsing YAML: ${e}`);
    }
}
