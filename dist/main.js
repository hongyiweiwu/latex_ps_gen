#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const generate_1 = require("./generate");
const yargs_1 = __importDefault(require("yargs"));
const arg = yargs_1.default.command('init', 'Initialize a directory', (yargsIns) => yargsIns, (_) => init_1.init())
    .command(['generate', '$0'], 'generate a new document', (yargsIns) => yargsIns.options({
    config: { type: "string", alias: "c", demandOption: true, default: ".lpg.json" },
    dir: { type: "string", alias: "d", demandOption: true, default: `${process.cwd()}/` },
}), (argv) => generate_1.generate(argv)).argv;
//# sourceMappingURL=main.js.map