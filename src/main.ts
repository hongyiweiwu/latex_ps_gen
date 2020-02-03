#!/usr/bin/env node
import * as fs from "fs";
import prompts from "prompts";
import * as roman from "roman-numerals";
import yargs from "yargs";
import { IConfig, PsNumberingScheme, QuestionNumberingScheme } from "./schema";

const defaultConfigFileName = "config.json";
const romanNumeralRegex = RegExp("(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})");
const arabicNumeralRegex = RegExp("[1-9]+[0-9]*");
const romanNumeralFilenameRegex = RegExp("^Assignment " + romanNumeralRegex.source + ".tex$");
const arabicNumeralFilenameRegex = RegExp("^Assignment " + arabicNumeralRegex.source + ".tex$");

const indentation = "    ";

async function main() {
    const argv = yargs.options({
        config: { type: "string", alias: "c", demandOption: true },
        dir: { type: "string", alias: "d", demandOption: true },
    }).argv;

    const config = loadConfig(argv.dir, argv.config);
    const psIndex = findPsIndex(argv.dir, config.psNumberingScheme);

    // An array of content to be joined into the final tex file. Each entry corresponds to one line.
    const headerContent = [
        "\\documentclass{article}\n",
        "\\title{" + config.courseTitle + ": Assignment " + psIndex + "}",
        "\\author{" + config.author + "}\n",
    ];
    const packageContent = new Set(config.packages.map((packageName, _, __) => "\\usepackage{" + packageName + "}"));
    const [needsEnumitem, mainContent] = await draftMainContent(config.questionNumberingScheme);

    if (needsEnumitem) {
        packageContent.add("\\usepackage{enumitem}");
    }

    writeToNewFile(argv.dir, psIndex, ...headerContent, ...packageContent, ...mainContent);
}

function loadConfig(directory: string, configRelDirectory: string = defaultConfigFileName): IConfig {
    const fileByte = fs.readFileSync(directory + configRelDirectory, { encoding: "utf-8" });
    return JSON.parse(fileByte);
}

function findPsIndex(directory: string, numberingScheme: PsNumberingScheme): string {
    // Loading all matching filenames.
    const filenames = fs.readdirSync(directory);
    const romanNumeralFilenames = filenames.filter((filename, _, __) => {
        return romanNumeralFilenameRegex.test(filename);
    });
    const arabicNumeralFilenames = filenames.filter((filename, _, __) => {
        return arabicNumeralFilenameRegex.test(filename);
    });

    // Find filename with maximum index.
    const romanNumeralIndices = romanNumeralFilenames.map((filename, _, __) =>
        roman.toArabic(romanNumeralRegex.exec(filename)[0]));
    const arabicNumeralIndices = arabicNumeralFilenames.map((filename, _, __) =>
        Number.parseInt(arabicNumeralRegex.exec(filename)[0], 10));
    const indices = [...romanNumeralIndices, ...arabicNumeralIndices, 0];
    const newIndex = Math.max(...indices) + 1;

    if (numberingScheme === "roman") {
        return roman.toRoman(newIndex || 1);
    } else if (numberingScheme === "arabic") {
        return (newIndex || 1).toString();
    }
}

async function draftMainContent(qsNumberingScheme: QuestionNumberingScheme): Promise<[boolean, string[]]> {
    switch (qsNumberingScheme.scheme) {
        case "enumerate":
            const num: number = (await prompts({
                message: "How many questions do you have this time?",
                min: 1,
                name: "num",
                type: "number",
            })).num;

            return [true, [
                "\n\\begin{document}",
                indentation + "\\maketitle",
                indentation + "\\begin{enumerate}[label=" + qsNumberingScheme.format + "]",
                ...Array(num).fill(indentation + indentation + "\\item"),
                indentation + "\\end{enumerate}",
                "\n\\end{document}",
            ]];

        case "description":
            const questionTitles: string[] = (await prompts({
                message: "Input the titles of all questions, separated by commas.",
                name: "titles",
                type: "list",
            })).titles;

            return [false, [
                "\n\\begin{document}",
                indentation + "\\maketitle",
                indentation + "\\begin{description}",
                ...questionTitles.map((title) => indentation + indentation + "\\item \\textbf{" + title + "}"),
                indentation + "\\end{description}",
                "\n\\end{document}",
            ]];
    }
}

function writeToNewFile(directory: string, psIndex: string, ...content: string[]) {
    const finalContent = content.join("\n");
    fs.writeFileSync(directory.concat("Assignment ", psIndex, ".tex"), finalContent);
}

main();
