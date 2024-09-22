/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from './JudgeCase';
import type { JudgeConf } from './JudgeConf';
export type QuestionAddRequest = {
    answer?: string;
    content?: string;
    judgeCase?: Array<JudgeCase>;
    judgeConf?: JudgeConf;
    tags?: Array<string>;
    title?: string;
};

