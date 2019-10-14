export type PsNumberingScheme = "roman" | "arabic";

export type QuestionNumberingScheme = {
    scheme: "enumerate";
    format: string;
} | {
    scheme: "description",
};

export interface IConfig {
    courseTitle: NonNullable<string>;
    author: NonNullable<string>;
    psNumberingScheme: PsNumberingScheme;
    questionNumberingScheme: QuestionNumberingScheme;
    packages: string[];
}
