import { promises as fs } from 'fs';

export async function init() {
    const data = {
        "$schema": __dirname.replace('/dist', '') + '/schema.json',
    }
    await fs.writeFile('.lpg.json', JSON.stringify(data, null, 4));
}