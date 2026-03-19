/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_CommentVO_ } from '../models/BaseResponse_Page_CommentVO_';
import type { BaseResponse_Page_Question_ } from '../models/BaseResponse_Page_Question_';
import type { BaseResponse_Page_QuestionSubmitVO_ } from '../models/BaseResponse_Page_QuestionSubmitVO_';
import type { BaseResponse_Page_QuestionVO_ } from '../models/BaseResponse_Page_QuestionVO_';
import type { BaseResponse_Question_ } from '../models/BaseResponse_Question_';
import type { BaseResponse_QuestionSubmitVO_ } from '../models/BaseResponse_QuestionSubmitVO_';
import type { BaseResponse_QuestionVO_ } from '../models/BaseResponse_QuestionVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { Flux_string_ } from '../models/Flux_string_';
import type { QuestionAddRequest } from '../models/QuestionAddRequest';
import type { QuestionCommentAddRequest } from '../models/QuestionCommentAddRequest';
import type { QuestionCommentQueryRequest } from '../models/QuestionCommentQueryRequest';
import type { QuestionEditRequest } from '../models/QuestionEditRequest';
import type { QuestionQueryRequest } from '../models/QuestionQueryRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * addQuestion
     * @param questionAddRequest questionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost(
        questionAddRequest: QuestionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/add',
            body: questionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * addComment
     * @param questionCommentAddRequest questionCommentAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addCommentUsingPost(
        questionCommentAddRequest: QuestionCommentAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/add',
            body: questionCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * cancelThumbComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static cancelThumbCommentUsingPut(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/question/comment/cancel/thumb',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteCommentUsingDelete(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/question/comment/delete',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * postCommentsByQuestionId
     * @param questionCommentQueryRequest questionCommentQueryRequest
     * @returns BaseResponse_Page_CommentVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static postCommentsByQuestionIdUsingPost(
        questionCommentQueryRequest: QuestionCommentQueryRequest,
    ): CancelablePromise<BaseResponse_Page_CommentVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/list/page/vo',
            body: questionCommentQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * thumbComment
     * @param commentId commentId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static thumbCommentUsingPut(
        commentId?: number,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/question/comment/thumb',
            query: {
                'commentId': commentId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestion
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * editQuestion
     * @param questionEditRequest questionEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editQuestionUsingPost(
        questionEditRequest: QuestionEditRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/edit',
            body: questionEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * errorAnswerAIAnalysis
     * @param questionSubmitId questionSubmitId
     * @returns Flux_string_ OK
     * @throws ApiError
     */
    public static errorAnswerAiAnalysisUsingGet(
        questionSubmitId?: number,
    ): CancelablePromise<Flux_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/errorAnswerAIAnalysis',
            query: {
                'questionSubmitId': questionSubmitId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionById
     * @param id id
     * @returns BaseResponse_Question_ OK
     * @throws ApiError
     */
    public static getQuestionByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_Question_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get/entity',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionVOById
     * @param id id
     * @returns BaseResponse_QuestionVO_ OK
     * @throws ApiError
     */
    public static getQuestionVoByIdUsingGet(
        id?: number,
    ): CancelablePromise<BaseResponse_QuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionByPage
     * @param questionQueryRequest questionQueryRequest
     * @returns BaseResponse_Page_Question_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionByPageUsingPost(
        questionQueryRequest: QuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_Question_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list/page',
            body: questionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionVOByPage
     * @param questionQueryRequest questionQueryRequest
     * @returns BaseResponse_Page_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionVoByPageUsingPost(
        questionQueryRequest: QuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list/page/vo',
            body: questionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listMyQuestionVOByPage
     * @param questionQueryRequest questionQueryRequest
     * @returns BaseResponse_Page_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyQuestionVoByPageUsingPost(
        questionQueryRequest: QuestionQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/my/list/page/vo',
            body: questionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * doQuestionSubmit
     * @param questionSubmitAddRequest questionSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doQuestionSubmitUsingPost(
        questionSubmitAddRequest: QuestionSubmitAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/submit/do',
            body: questionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionSubmitVoByPage
     * @param questionSubmitQueryRequest questionSubmitQueryRequest
     * @returns BaseResponse_Page_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitVoByPageUsingPost(
        questionSubmitQueryRequest: QuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/submit/page/vo',
            body: questionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitVOById
     * @param submitId submitId
     * @returns BaseResponse_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getQuestionSubmitVoByIdUsingPost(
        submitId?: number,
    ): CancelablePromise<BaseResponse_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/submit/vo',
            query: {
                'submitId': submitId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestion
     * @param questionUpdateRequest questionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionUsingPost(
        questionUpdateRequest: QuestionUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/update',
            body: questionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
