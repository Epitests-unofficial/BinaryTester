import* as fs from 'fs';
import error from '../modules/log.js';
import { Runner, Test, Out } from '../modules/types.js';
import parse from './parse.js';


export default async function parseYaml(runner: Runner): Promise<Runner> {
    let data = fs.readFileSync(runner.testFilePath, 'utf8');
    if (!data) error(`Error reading file from disk: ${runner.testFilePath}`);
    try {
        return await parse(runner, JSON.parse(data));
    } catch(e) {
        error(`Error parsing JSON: ${e}`);
    }
}
