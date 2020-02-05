#!/usr/bin/env node

import { init } from "./init";
import { generate } from './generate';

import yargs from 'yargs';

const arg = yargs.command('init', 'Initialize a directory', (yargsIns) => yargsIns, (_) => init())
.command(['generate', '$0'], 'generate a new document', (yargsIns) => yargsIns.options({
    config: { type: "string", alias: "c", demandOption: true, default: ".lpg.json" },
    dir: { type: "string", alias: "d", demandOption: true, default: `${process.cwd()}/` },
}), (argv) => generate(argv)).argv;
