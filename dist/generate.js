#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const prompts_1 = __importDefault(require("prompts"));
const roman = __importStar(require("roman-numerals"));
const defaultConfigFileName = ".lpg.json";
const romanNumeralRegex = RegExp("(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})");
const arabicNumeralRegex = RegExp("[1-9]+[0-9]*");
const romanNumeralFilenameRegex = RegExp("^Assignment " + romanNumeralRegex.source + ".tex$");
const arabicNumeralFilenameRegex = RegExp("^Assignment " + arabicNumeralRegex.source + ".tex$");
const indentation = "    ";
function generate(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = loadConfig(argv.dir, argv.config);
        const psIndex = findPsIndex(argv.dir, config.psNumberingScheme);
        // An array of content to be joined into the final tex file. Each entry corresponds to one line.
        const headerContent = [
            "\\documentclass{article}\n",
            "\\title{" + config.courseTitle + ": Assignment " + psIndex + "}",
            "\\author{" + config.author + "}\n",
        ];
        const packageContent = new Set(config.packages.map((packageName, _, __) => "\\usepackage{" + packageName + "}"));
        const [needsEnumitem, mainContent] = yield draftMainContent(config.questionNumberingScheme);
        if (needsEnumitem) {
            packageContent.add("\\usepackage{enumitem}");
        }
        writeToNewFile(argv.dir, psIndex, ...headerContent, ...packageContent, ...mainContent);
    });
}
exports.generate = generate;
function loadConfig(directory, configRelDirectory = defaultConfigFileName) {
    const fileByte = fs.readFileSync(directory + configRelDirectory, { encoding: "utf-8" });
    return JSON.parse(fileByte);
}
function findPsIndex(directory, numberingScheme) {
    // Loading all matching filenames.
    const filenames = fs.readdirSync(directory);
    const romanNumeralFilenames = filenames.filter((filename, _, __) => {
        return romanNumeralFilenameRegex.test(filename);
    });
    const arabicNumeralFilenames = filenames.filter((filename, _, __) => {
        return arabicNumeralFilenameRegex.test(filename);
    });
    // Find filename with maximum index.
    const romanNumeralIndices = romanNumeralFilenames.map((filename, _, __) => roman.toArabic(romanNumeralRegex.exec(filename)[0]));
    const arabicNumeralIndices = arabicNumeralFilenames.map((filename, _, __) => Number.parseInt(arabicNumeralRegex.exec(filename)[0], 10));
    const indices = [...romanNumeralIndices, ...arabicNumeralIndices, 0];
    const newIndex = Math.max(...indices) + 1;
    if (numberingScheme === "roman") {
        return roman.toRoman(newIndex || 1);
    }
    else if (numberingScheme === "arabic") {
        return (newIndex || 1).toString();
    }
}
function draftMainContent(qsNumberingScheme) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (qsNumberingScheme.scheme) {
            case "enumerate":
                const num = (yield prompts_1.default({
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
                const questionTitles = (yield prompts_1.default({
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
    });
}
function writeToNewFile(directory, psIndex, ...content) {
    const finalContent = content.join("\n");
    fs.writeFileSync(directory.concat("Assignment ", psIndex, ".tex"), finalContent);
}
//# sourceMappingURL=generate.js.map