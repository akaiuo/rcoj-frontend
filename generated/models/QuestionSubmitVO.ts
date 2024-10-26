/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from './JudgeInfo';
import type { JudgeInfoDetail } from './JudgeInfoDetail';
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';
export type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    executeMessage?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    judgeInfoDetail?: JudgeInfoDetail;
    lang?: string;
    questionId?: number;
    questionVO?: QuestionVO;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};

